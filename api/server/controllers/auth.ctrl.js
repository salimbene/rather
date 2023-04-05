'use strict';
const config = require('config');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { genAuthToken } = require('../services/auth.srv');

const login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user, password } = req.body;

  if (!['admin', 'user'].includes(user))
    return res.status(400).send('Invalid user.');

  const isAdmin = user === 'admin';
  const passwd = isAdmin ? config.get('ADMIN_PWD') : config.get('USER_PWD');

  // This implementation uses two hardcoded dummy users
  // an real world implementation would connecto to an external
  // service (such as a db)

  const validPassword = await bcrypt.compare(password, passwd);
  if (!validPassword) return res.status(400).send('Invalid password.');

  const token = genAuthToken(user, isAdmin);

  res.status(200).send(token);
};

function validate(req) {
  const schema = Joi.object({
    user: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(req);
}

module.exports.login = login;
