let Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkCampgroundOnwership = function (req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground?
                if (campground.author.id.equals(req.user._id)) {
                    // campground.author.id.equals(req.user._id) is the 
                    // method provided by mongoose because 
                    // campground.author.id is an object
                    // req.user._id is a String
                    // they can be compaired by double or triple equal sign
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOnwership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;