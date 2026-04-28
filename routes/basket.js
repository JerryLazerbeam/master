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

  res.render('basket', {
    basketItems,
    totalPrice
  });
});

router.post('/add', (req, res) => {
  const productId = req.body.productId;

  if (!req.session.basket) {
    req.session.basket = {};
  }

  req.session.basket[productId] = (req.session.basket[productId] || 0) + 1;

  res.redirect('/basket');
});

router.post('/remove', (req, res) => {
  const productId = req.body.productId;
  const redirectTo = req.body.redirectTo || '/basket';

  if (req.session.basket) {
    delete req.session.basket[productId];
  }

  res.redirect(redirectTo);
});

router.post('/update', (req, res) => {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);

  if (!req.session.basket) {
    req.session.basket = {};
  }

  if (quantity <= 0) {
    delete req.session.basket[productId];
  } else {
    req.session.basket[productId] = quantity;
  }

  res.redirect('/basket');
});

module.exports = router;
