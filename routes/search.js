const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  const query = req.query.q || ''.trim();

  if (!query) {
    return res.redirect('/');
  }

  const products = db.prepare(`
    SELECT * FROM products
    WHERE LOWER(name) LIKE LOWER(?)
    OR LOWER(slug) LIKE LOWER(?)
    OR LOWER(description) LIKE LOWER(?)
    LIMIT 1
`).all(`%${query}%`, `%${query}%`, `%${query}%`);

  if (!products.length) {
    return res.redirect(`/?notFound=${encodeURIComponent(query)}`);
  }

  const product = products[0];
  return res.redirect(`/products/${product.slug}`);
});
router.get('/suggestions', (req, res) => {
  const query = (req.query.q || '').trim();

  if (!query) {
    return res.json([]);
  }

  const products = db.prepare(`
    SELECT name, slug
    FROM products
    WHERE LOWER(name) LIKE LOWER(?)
       OR LOWER(slug) LIKE LOWER(?)
       OR LOWER(description) LIKE LOWER(?)
    LIMIT 3
  `).all(`%${query}%`, `%${query}%`, `%${query}%`);

  res.json(products);
});


module.exports = router;
