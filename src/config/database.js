const monk = require('monk');
const db = monk(process.env.MONGODB_URI);

module.exports = db;