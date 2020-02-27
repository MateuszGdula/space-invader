'use strict';
const express = require('express');
const sanitizer = require('./middlewares/sanitizer');
const ScoresDAO = require('./dao/scores-dao');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizer);

app.use(express.static('dist'));

app.post('/scores', async (req, res) =>{
    const { name , score} = req.body;
    let result;
    let statusCode;

    if (typeof name === 'string' && typeof score === 'number') {
        result = {};
        result.data = {};
        result.data.user = await ScoresDAO.addScore(name, score);
        result.data.top = await ScoresDAO.getTopScores(10);
        statusCode = 201;
    } else {
        result = {error: 'Invalid type of data'}
        statusCode = 400;
    }

    res.status(statusCode).json(result);
});

module.exports = app;