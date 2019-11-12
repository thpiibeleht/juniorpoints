const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Tournament = require("./models/Tournament");
const Player = require("./models/Player");
const User = require("./models/User");
const playerRoutes = require("./routes/player");
const tournamentRoutes = require("./routes/tournament");
const indexRoutes = require("./routes/index");
const methodOverride = require('method-override');
const flash = require("connect-flash");

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/juniorpoints", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "This a very secrety secret sentence",
    resave: false,
    saveUninitialized: false
    // cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/players", playerRoutes);
app.use("/tournaments", tournamentRoutes);

app.get("/", (req, res) => {
    res.redirect("/players");
});


app.listen(port, ()=>{
    console.log("Juniorpoints app started")
});

