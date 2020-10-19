const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 30 * 1000,
  max: 1,
})