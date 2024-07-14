const Scoreboard = require('../models/scoreboard');
const User = require('../../user/models/user');

const submitScore = async (req, res) => {
  const { userId, puzzleId, totalScore } = req.body;

  try {
    await updateHighScore(userId, totalScore);
    let scoreboard = await Scoreboard.findOne({ user: userId, puzzle: puzzleId });

    if (scoreboard) {
      scoreboard.totalScore = totalScore;
    } else {
      scoreboard = new Scoreboard({
        user: userId,
        puzzle: puzzleId,
        totalScore,
      });
    }
    await scoreboard.save();

    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
};

const updateHighScore = async (userId, newScore) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    if (newScore > user.highScore) {
      user.highScore = newScore;
      await user.save();
    }
  } catch (error) {
    console.error('Error updating highScore:', error);
    throw error;
  }
};

module.exports = {
  submitScore,
};