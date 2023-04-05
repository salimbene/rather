'use strict';
const logger = require('../util/logger');

const {
  getPopularContent,
  filterContent,
  getFullData,
} = require('../services/tmdb.srv');

const popularContent = async (req, res) => {
  logger.info('popularContent ctrl started ...');

  const response = await getPopularContent();

  res.status(200).send(response);
};

const searchContent = async (req, res) => {
  logger.info('searchContent ctrl started ...');
  const { filter } = req.query;
  const response = await filterContent(filter);
  res.status(200).send(response);
};

const getDetails = async (req, res) => {
  logger.info('getDetails ctrl started ...');
  const { content, id } = req.params;
  const response = await getFullData(id, content);
  res.status(200).send(response);
};

module.exports = {
  popularContent,
  searchContent,
  getDetails,
};
