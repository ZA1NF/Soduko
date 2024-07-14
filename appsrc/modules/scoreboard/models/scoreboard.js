const mongoose = require('mongoose');

const scoreboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  puzzle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Puzzle',
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;