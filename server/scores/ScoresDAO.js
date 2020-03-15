'use strict';
const MongoClient = require('mongodb').MongoClient;
const logger = require('../modules/logger/logger');
let scores;

class ScoresDAO {

    static async connectDB() {
        if (scores) return;

        try {
            const dbConnection = await MongoClient.connect(process.env.CONN_STRING, {
                //connection settings
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            scores = await dbConnection.db(process.env.DB_NAME).collection('scores');
            logger("ScoresDAO connected successfuly");
            return;
        } catch(e) {
            await logger(`Error on DB connection: ${e}`);
            process.exit(1);
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