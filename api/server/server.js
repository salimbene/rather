'use strict';
require('dotenv').config();

const logger = require('./util/logger');
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

// express server setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// logging HTTP request in development only
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// express routes setup
require('./startup/routes')(app);

// set the port
const port = process.env.PORT || config.get('PORT');

// log startup message
const { name } = require('../package.json');

const server = app.listen(port, () => {
  logger.info(`app booted on ${process.env.NODE_ENV} environment`);
  logger.info(`${name} is listening on ${port}`);
});

module.exports = server;
