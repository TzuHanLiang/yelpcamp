let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("process.env.MONGODB_URI || mongodb://localhost/yelp_camp_v3", {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
seedDB();

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
                campgrounds: campgrounds
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
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    };

    Campground.create(newCampground, function (err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
            console.log("___success___");
            console.log(newCampground);
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

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            // create new comment 
            Comment.create(req.body.comments, function(err, comment){
                if(err){
                    console.log(err);
                }else{
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

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp Server is on");
});