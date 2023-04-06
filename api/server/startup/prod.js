'use strict';

const helmet = require('helmet'); // Secure HTTP headers
const compression = require('compression');

const logger = require('../util/logger');

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());

  app.enable('trust proxy');

  // Redirect to https
  app.use((req, res, next) => {
    if (req.secure) {
      logger.info('Secure request', req.secure);
      next();
    } else {
      logger.info(`redirect to ... https://${req.headers}${req.url}`);
      res.redirect(`https://${req.headers}${req.url}`);
    }
  });
};
