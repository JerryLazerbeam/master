const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/:slug', (req, res) => {
  const slug = req.params.slug;

  const product = db.prepare(`
    SELECT * FROM products WHERE slug = ?
  `).get(slug);

  const related = db.prepare(`
  SELECT * FROM products 
  WHERE slug != ? 
  LIMIT 6
`).all(slug);

  if (!product) {
    return res.status(404).render('error');
  }

  res.render('products', { product, related });
});

module.exports = router;