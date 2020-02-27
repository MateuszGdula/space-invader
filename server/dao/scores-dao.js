'use strict';
const logger = require('../modules/logger/logger');
let scores;

class ScoresDAO {

    /**
     * 
     * @param {Object} dbConn reference to the connected DB
     * @param {String} dbName the name of the DB
     */
    static async getCollections(dbConn, dbName) {
        try {
            scores = await dbConn.db(dbName).collection('scores');
            logger("Got scores collection in scores-dao");
            return;
        } catch(e) {
            logger(`Error on getting scores colletion: ${e.message}`);
            return;
        }
    }

    /**
     * 
     * @param {String} name
     * @param {Number} score 
     * @returns {Object}
     */
    static async addScore(name, score) {

        const data = {
            name,
            score
        }

        try {
            const result = await scores.insertOne(data);
            return result.ops[0];
        } catch(e) {
            logger(`Error on adding a score: ${e.message}`);
            return {error: e.message};
        }
    }

    /**
     * @param {Number} quantity
     * @returns {Object}
     */
    static async getTopScores(quantity) {

        try {
            const result = await scores.find().sort({score: -1}).limit(quantity).toArray();
            return result;
        } catch (e) {
            logger(`Error on getting top scores: ${e.message}`);
            return {error: e.message};
        }
    }
}

module.exports = ScoresDAO;