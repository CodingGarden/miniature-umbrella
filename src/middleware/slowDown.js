const slowDown = require('express-slow-down');

module.exports =  slowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
  });

