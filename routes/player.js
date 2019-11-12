const express = require("express");
const Player = require("../models/Player");

const router = express.Router();
const middleware = require('../config/index');

router.get('/', (req, res) => {
    Player.find({yearOfBirth: {$gte: new Date().getFullYear() - 25}}, (err, players) => {
        if(err) {
            res.redirect('landing', {error: err});
        }
        else {
            res.render('landing', {players: players});
        }
    })
});


router.post("/", middleware.isLoggedIn, (req, res) => {

    const pl = req.body.player;

    const player = new Player({name: pl.name, yearOfBirth: pl.year});
    player.save(function(err, newPlayer) {
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
        }
        else {
            req.flash("success", "Player added!");
            res.redirect("/players")
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("./players/create")
});

router.get("/:id", function (req, res) {
    Player.findById(req.params.id).populate("tournaments").exec(function (err, foundPlayer) {
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect('/players')
        }
        else {
            res.render("./players/show", {player: foundPlayer});
        }
    });
});

router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        res.render("./players/edit", {player: foundPlayer});
    });
});

router.put("/:id", middleware.isLoggedIn, (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body.player, (err, updatedPlayer) => {
        if(err) {
            res.redirect("/players");
        }
        else {
            res.redirect("/players/" + req.params.id)
        }
    })
});

router.delete("/:id", middleware.isLoggedIn, (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/players")
        }
        else {
            req.flash("success", "Player deleted!");
            res.redirect("/players")
        }
    })
});

module.exports = router;
