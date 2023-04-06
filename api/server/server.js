'use strict';
require('dotenv').config();

const logger = require('./util/logger');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

// express server setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const env = app.get('env');
// logging HTTP request in development only
if (env === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} else require('./startup/prod')(app);

// express routes setup
require('./startup/routes')(app);

// set the port
const port = process.env.PORT || config.get('PORT');

// log startup message
const { name } = require('../package.json');

const server = app.listen(port, () => {
  logger.info(`app booted on ${env} environment`);
  logger.info(`${name} is listening on ${port}`);
});

module.exports = server;
