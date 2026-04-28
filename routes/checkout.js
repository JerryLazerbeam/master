const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  const basket = req.session.basket || {};
  const productIds = Object.keys(basket).map(Number);

  let basketItems = [];

  if (productIds.length > 0) {
    const placeholders = productIds.map(() => '?').join(',');
    const products = db.prepare(`SELECT * FROM products WHERE id IN (${placeholders})`).all(...productIds);

    basketItems = products.map(product => {
      const quantity = basket[product.id];

      return {
        ...product,
        quantity,
        total: product.price * quantity
      };
    });
  }

  const totalPrice = basketItems.reduce((sum, item) => sum + item.total, 0);

  res.render('checkout', {
    basketItems,
    totalPrice
  });
});

module.exports = router;
