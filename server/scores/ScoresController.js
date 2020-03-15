'use strict';
const ScoresDAO = require('./ScoresDAO');

class ScoresController {

    static async add(req, res, next) {
        const { name , score} = req.body;
        let result;
        let statusCode;

        try {
            if (typeof name !== 'string' || typeof score !== 'number') throw new Error('Invalid type of data');
            result = {};
            result.data = {};
            result.data.user = await ScoresDAO.addScore(name, score);
            result.data.topPlayers = await ScoresDAO.getTopScores(10);
            statusCode = 201;
        } catch(e) {
            result = {error: e.message}
            statusCode = 400;
        }

        res.status(statusCode).json(result);
    }
}

module.exports = ScoresController;