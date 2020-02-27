'use strict';
const MongoClient = require('mongodb').MongoClient;
const ScoresDAO = require('./scores-dao');
const logger = require('../modules/logger/logger');

/**
 * 
 * @param {String} dbConnString 
 * @param {String} dbName 
 */
async function connectDB(dbConnString, dbName) {
    try {
        const dbConn = await MongoClient.connect(dbConnString, {
            //connection settings
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await ScoresDAO.getCollections(dbConn, dbName);
        logger("DB connected successfuly");
        return;
    } catch(e) {
        await logger(`Error on DB connection: ${e}`);
        process.exit(1);
    }
}

module.exports = connectDB;