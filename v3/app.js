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
            res.render("index", {
                campgrounds: campgrounds
            });
        }
    });

});

// NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
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
            res.render("show", {
                campground: foundCampground
            });
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp Server is on");
});