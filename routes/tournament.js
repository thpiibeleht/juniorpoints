const express = require("express");
const Tournament = require("../models/Tournament");

const router = express.Router();
const middleware = require('../config/index');

router.get('/', (req, res) => {
    Tournament.find({}, (err, foundTournaments) => {
        if(err) {
            res.redirect('landing', {error: err});
        }
        else {
            res.render('./tournaments/index', {tournaments: foundTournaments});
        }
    })
});

// Name, Date, Results, MP awards, JP awards
router.post("/", middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const results = req.body.results;
    const masterPointAwards = req.body.masterPointAwards;
    const juniorPointAwards = req.body.juniorPointAwards;

    const tournament = new Tournament(
        {
            name: name,
            date: new Date.now(),
            results: results,
            masterPointAwards: masterPointAwards,
            juniorPointAwards: juniorPointAwards,
        });
    tournament.save(function(err, newTournament) {
        if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
        }
        else {
            req.flash("success", "Player added!");
            res.redirect("/tournaments")
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("./tournaments/create")
});

router.get("/:id", function (req, res) {
    Tournament.findById(req.params.id).populate("results").exec(function (err, foundTournament) {
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect('/tournaments')
        }
        else {
            res.render("./tournaments/show", {tournament: foundTournament});
        }
    });
});

router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
    Tournament.findById(req.params.id, (err, foundTournament) => {
        res.render("./tournaments/edit", {tournament: foundTournament});
    });
});

router.put("/:id", middleware.isLoggedIn, (req, res) => {
    Tournament.findByIdAndUpdate(req.params.id, req.body.tournament, (err, updatedTournament) => {
        if(err) {
            res.redirect("/tournaments");
        }
        else {
            res.redirect("/tournaments/" + req.params.id)
        }
    })
});

router.delete("/:id", middleware.isLoggedIn, (req, res) => {
    Tournament.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/tournaments")
        }
        else {
            req.flash("success", "Tournament deleted!");
            res.redirect("/tournaments")
        }
    })
});

module.exports = router;
