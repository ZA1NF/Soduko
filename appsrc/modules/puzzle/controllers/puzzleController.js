const Puzzle = require('../models/puzzle');
const generateSudoku = require('../utils/sudokuGenerator');

const getPuzzle = async (req, res) => {
  const { difficulty } = req.query;
  try {
    const puzzleData = generateSudoku(difficulty);
    console.log('data------>', puzzleData);
    const puzzle = new Puzzle({
      puzzle: puzzleData.puzzle,
      solution: puzzleData.solution,
      difficulty,
      attempts: puzzleData.attempts,
    });
    await puzzle.save();
    res.status(200).json(puzzle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPuzzle,
};