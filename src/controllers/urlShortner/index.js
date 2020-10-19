const schema = require('../../middleware/requestValidation');
const { nanoid } = require('nanoid');

const db = require('../../config/database')


async function shortUrl (req, res, next) {
  const urls = db.get('urls');
  let { slug, url } = req.body;
  try {
    await schema.validate({
      slug,
      url,
    });
    if (url.includes('cdg.sh')) {
      throw new Error('Stop it. 🛑');
    }
    if (!slug) {
      slug = nanoid(5);
    } else {
      const existing = await urls.findOne({ slug });
      if (existing) {
        throw new Error('Slug in use. 🍔');
      }
    }
    slug = slug.toLowerCase();
    const newUrl = {
      url,
      slug,
    };
    const created = await urls.insert(newUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
}

module.exports = shortUrl;