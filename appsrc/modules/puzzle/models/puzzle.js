const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
  puzzle: {
    type: Array,
    required: true,
  },
  solution: {
    type: Array,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
  }
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;