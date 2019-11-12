const express = require("express");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();


// Register route, only use when necessary to add other admins

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Junior Points " + user.username);
            res.redirect("/players");
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {successRedirect: "/players",
        failureRedirect: "/login"}),
    (req, res) => {
    });

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/players");
});

module.exports = router;
