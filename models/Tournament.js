const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: String,
    date: Date,
    results: [
        {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
                required: true
            },
            totalScore: Number,
            place: {type: Number, required: true},
            mpFromSessions: Number,
        }
    ],
    // This is used to calculate earned masterpoints per tournament
    masterPointAwards: [Number],
    // This is used to specify the points earned from the tournament
    juniorPointAwards: {type: [Number], required: true},
    // IMP, MP, VP, etc
    scoringType: String,
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
