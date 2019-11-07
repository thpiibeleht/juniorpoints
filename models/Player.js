const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    yearOfBirth: Number,
    tournaments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament"
        }
    ],
});

playerSchema.methods.calculatePoints = function () {
    return 0;
};

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
