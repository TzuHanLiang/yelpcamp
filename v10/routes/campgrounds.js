let express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

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
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// CREATE -  create a new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    var newCampground = req.body.campground;
    newCampground["author"] = {
        id: req.user._id,
        username: req.user.username,
    };
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
            console.log("___success___");
            console.log(campground);
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOnwership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("campgrounds/edit", {
            campground: campground
        });
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOnwership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updateCampground) {
        if (err) {
            res.redirect(`/campgrounds/${req.params.id}/edit`);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOnwership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;