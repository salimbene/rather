'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

const genAuthToken = (user, isAdmin) => {
  const token = jwt.sign(
    {
      user,
      isAdmin,
      createdAt: new Date().toISOString(),
    },
    config.get('RATHER_SECRET')
  );
  return token;
};

module.exports = {
  genAuthToken,
};
