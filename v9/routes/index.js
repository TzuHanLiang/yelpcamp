let express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function (req, res) {
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

//show login form
router.get("/login", function (req, res) {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/register",
}), function (req, res) {});

// logout route
router.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/campgrounds");
});


module.exports = router;