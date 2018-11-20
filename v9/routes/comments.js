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
                    //========= Why can we use req.user ================
                    // req.user contains the authenticated user and it is set 
                    // automatically by the Passport.js middleware after a 
                    // successful login. You can access it where ever you have 
                    // access to the req, res objects - basically in the route 
                    // callback functions. It's very useful if you want to access 
                    // data from the currently logged in user.
                    //====================================
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
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