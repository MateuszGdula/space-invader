'use strict';
const logger = require('./modules/logger/logger');
const app = require('./app');

logger("The app is starting");

app.listen(process.env.PORT, () => logger(`App listen at port ${process.env.PORT}`));
