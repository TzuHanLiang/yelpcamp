let express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");

// INDEX - show all the campgrounds 
router.get("/", function (req, res) {
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
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

// CREATE -  create a new campground to DB
router.post("/", function (req, res) {
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
router.get("/:id", function (req, res) {
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

module.exports = router;