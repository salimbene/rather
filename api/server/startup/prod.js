'use strict';

const helmet = require('helmet'); // Secure HTTP headers
const compression = require('compression');
const serveStatic = require('serve-static');

const logger = require('../util/logger');
const path = require('path');
const cwd = process.cwd();

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());

  logger.info('serving static content: ', path.join(cwd, 'build'));

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
  // }
  app.use(
    serveStatic(path.join(cwd, 'build'), {
      index: false,
      setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'public, immutable, max-age=31536000');
      },
    })
  );

  // Route any non API and non static file to React Client Router
  // for SPA development
  app.use((req, res) => {
    logger.info('sendFile', path.join(cwd, 'build', 'index.html'));
    res.sendFile(path.join(cwd, 'build', 'index.html'));
  });
};
