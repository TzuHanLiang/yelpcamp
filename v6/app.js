let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/yelp_camp_v6", {
    useNewUrlParser: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(`${__dirname}/public`));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Life is incredibale!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// the reason why can we setup like this is because we have use 
// userSchema.plugin(passLocalMongoose) in the user.js
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// we want to pass currentUser to every single route by using
// middleware.
// whatever function we provide to it will be called on every
// route.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function (req, res) {
    res.render("landing");
});

// '/INDEX' - show all the campgrounds 
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds,
                // currentUser: req.user, // covered by middleware
            });
        }
    });

});

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

// CREATE -  create a new campground to DB
app.post("/campgrounds", function (req, res) {
    // get data from form and add to compgrounds array
    // let name = req.body.name;
    // let image = req.body.image;
    // let description = req.body.description;
    // let newCampground = {
    //     name: name,
    //     image: image,
    //     description: description
    // };

    Campground.create(req.body.campground, function (err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
            console.log("___success___");
            console.log(req.body.campground);
        }
    });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    // find the campround with provided ID
    let id = req.params.id;
    Campground.findById(id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//================================================
// COMMENTS ROUTES
//================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            // create new comment 
            Comment.create(req.body.comments, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});

//=============
// AUTH ROUTES
//=============

//show register form
app.get("/register", function (req, res) {
    res.render("register");
});

// handle sign up logic
app.post("/register", function (req, res) {
    let newUser = new User({
        username: req.body.username
    });
    // User.register is provided by the passport-local-mongoose package
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            // I wonder what's difference between these two.
            return res.render("register");
            // return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/register",
}), function (req, res) {});

app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp Server is on");
});