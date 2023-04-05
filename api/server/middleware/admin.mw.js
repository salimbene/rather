'use strict';
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // 403 Forbidden - valid token, but not allowed

  if (!config.get('requiresAuth')) return next();

  const token = req.header('rather-token');
  const decoded = jwt.verify(token, config.get('RATHER_SECRET'));
  const { isAdmin } = decoded;
  if (!isAdmin) return res.status(403).send('Acceso denegado.');

  next();
};
