'use strict';
const logger = require('../util/logger');

module.exports = function (err, req, res, next) {
  const { message, stack } = err;
  logger.info('middelware error trigger: uncaught exception');
  logger.error(message);
  logger.error(stack);

  if (message.includes('Unexpected token'))
    return res.status(400).send(message);

  // Send error to client
  return res.status(500).send('server internal error');
};
