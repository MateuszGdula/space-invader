'use strict';
const express = require('express');
const sanitizer = require('./middlewares/sanitizer');
const scores = require('./scores');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizer);
app.use(express.static('dist'));

app.use('/scores', scores);

module.exports = app;