const express = require('express');
const { submitScore } = require('../controllers/scoreboardController');

const router = express.Router();

router.get('/submit', submitScore);

module.exports = router;