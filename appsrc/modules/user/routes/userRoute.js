const express = require('express');
const { addUser, getUserScores, addHighScore } = require('../controllers/userController');

const router = express.Router();

router.post('/addUser', addUser);
router.get('/:username/scores', getUserScores);
router.post('/scores', addHighScore);

module.exports = router;