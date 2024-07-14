const express = require('express');
const { getPuzzle } = require('../controllers/puzzleController');

const router = express.Router();

router.get('/', getPuzzle);

module.exports = router;