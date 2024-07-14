const User = require('../models/user');

const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'Name already taken' });
    }

    const user = new User({ name });
    await user.save();
    res.status(201).json({ userId: user._id });
  } catch (error) {
    console.error('Error adding user', error);
    res.status(500).json({ message: 'Error adding user', error });
  }
};

const getUserScores = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.highScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHighScore = async (req, res) => {
  const { username, score } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.highScores.push({ score });
    await user.save();
    res.status(201).json(user.highScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUserScores,
  addHighScore,
};