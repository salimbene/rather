'use strict';
const auth = require('../middleware/auth.mw');
const admin = require('../middleware/admin.mw');
const {
  popularContent,
  searchContent,
  getDetails,
} = require('../controllers/tmdb.crtl');

const express = require('express');
const router = express.Router();

router.get('/', popularContent);

router.post('/', auth, searchContent);

router.get('/:content/:id', [auth, admin], getDetails);

module.exports = router;
