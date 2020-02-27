'use strict';
const logger = require('./modules/logger/logger');
const app = require('./app');
const connectDB = require('./dao/connect');

logger("The app is starting");

connectDB(process.env.CONN_STRING, process.env.DB_NAME)
    .then(()=> {
        app.listen(process.env.PORT, () => logger(`App listen at port ${process.env.PORT}`));
    })
    .catch(e => logger(`Connection error on program start: ${e}`));