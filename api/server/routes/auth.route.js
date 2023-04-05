'use strict';
const { login } = require('../controllers/auth.ctrl');

const express = require('express');
const router = express.Router();

router.post('/', login);

module.exports = router;
