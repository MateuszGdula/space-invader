const express = require('express');
const ScoresController = require('./ScoresController');
const ScoresDAO = require('./ScoresDAO');
const router = express.Router();

ScoresDAO.connectDB();

router.route('/').post(ScoresController.add);

module.exports = router;
