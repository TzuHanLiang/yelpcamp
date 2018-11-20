let express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    // if we require a directory but not a file, it will 
    // automatically require the contents of index.js
    // that's supposed to be like the home where the main
    // file where other things are required.
    middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
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

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOnwership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: comment
            });
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOnwership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updateComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOnwership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;