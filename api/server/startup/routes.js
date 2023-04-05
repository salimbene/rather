'use strict';
require('express-async-errors');

const tmdb = require('../routes/tmdb.route');
const auth = require('../routes/auth.route');

const error = require('../middleware/error.mw');

module.exports = function (app) {
  app.use('/auth', auth);
  app.use('/tmdb', tmdb);
  app.use('/', (req, res) => {
    res.status(200).send('Movies API is online.');
  });

  app.use(error);
};
