const db = require('../../config/database')

const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

async function getById (req, res, next) {
  const { id: slug } = req.params;
  try {
    const url = await urls.findOne({ slug });
    if (url) {
      return res.redirect(url.url);
    }
    return res.status(404).sendFile(notFoundPath);
  } catch (error) {
    return res.status(404).sendFile(notFoundPath);
  }
}

module.exports = getById;