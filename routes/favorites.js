const express = require('express');
const db = require('../data/db');

const router = express.Router();

function getFavoriteProductIds(req) {
  if (!Array.isArray(req.session.favoriteProductIds)) {
    req.session.favoriteProductIds = [];
  }

  return req.session.favoriteProductIds;
}

router.get('/', (req, res) => {
  const favoriteProductIds = getFavoriteProductIds(req);

  let products = [];

  if (favoriteProductIds.length) {
    const placeholders = favoriteProductIds.map(() => '?').join(', ');

    products = db.prepare(`
      SELECT * FROM products
      WHERE id IN (${placeholders})
    `).all(...favoriteProductIds);
  }

  res.render('favorites', { products });
});

router.post('/:productId/toggle', (req, res) => {
  const productId = Number(req.params.productId);

  const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);

  if (!product) {
    if (req.accepts('json')) {
      return res.status(404).json({ error: 'Produkten finns inte' });
    }

    return res.redirect(req.get('Referrer') || '/favorites');
  }

  const favoriteProductIds = getFavoriteProductIds(req);
  const existingIndex = favoriteProductIds.indexOf(productId);
  let isFavorite = false;

  if (existingIndex >= 0) {
    favoriteProductIds.splice(existingIndex, 1);
  } else {
    favoriteProductIds.push(productId);
    isFavorite = true;
  }

  if (req.accepts('json')) {
    return res.json({ isFavorite });
  }

  res.redirect(req.get('Referrer') || '/favorites');
});

module.exports = router;
