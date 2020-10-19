const path = require('path');
const express = require('express');

const routes = express.Router()
const shortUrl = require('./controllers/urlShortner');

const rateLimit = require('./middleware/rateLimit')
const slowDown = require('./middleware/slowDown');
const getById = require('./controllers/urlID');

const notFoundPath = path.join(__dirname, 'public/404.html');

routes.get('/:id', getById);
routes.post('/url', slowDown, rateLimit, shortUrl);

routes.use((req, res, next) => {
  res.status(404).sendFile(notFoundPath);
});

routes.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

module.exports = routes;