let express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function (req, res) {
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

//Comments Create
router.post("/", isLoggedIn, function (req, res) {
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

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;