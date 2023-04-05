'use strict';

const { format, transports, createLogger } = require('winston');
const { splat, simple, printf, timestamp } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const level = process.env.NODE_ENV !== 'production' ? 'info' : 'error';

const all = new transports.File({
  filename: 'combined.log',
  level,
});

const error = new transports.File({
  filename: 'errors.log',
  level: 'error',
});

const console = new transports.Console({
  format: format.combine(),
});

const logger = createLogger({
  level,
  format: format.combine(
    splat(),
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [all, error, console],
});

logger.info('setting up winston logger');
module.exports = logger;
