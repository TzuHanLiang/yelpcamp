let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// requiring routes
let campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/yelp_camp_v9", {
    useNewUrlParser: true
});

app.set("view engine", "ejs");
mongoose.set("useFindAndModify", false);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));
// seedDB(); //seed the database

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
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp Server is on");
});