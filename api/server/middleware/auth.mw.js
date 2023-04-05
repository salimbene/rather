'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  if (!config.get('requiresAuth')) return next();

  const token = req.header('rather-token');
  // 401 Unauthorized - no token
  if (!token) return res.status(401).send('[1] access denied');

  const decoded = jwt.verify(token, config.get('RATHER_SECRET'));
  req.user = decoded;

  next();
};
