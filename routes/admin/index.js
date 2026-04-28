const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }

  next();
});

router.get('/products', (req, res) => {
  res.render('admin/products');
});

router.get('/products/new', (req, res) => {
  res.render('admin/products/new');
});

router.get('/categories', (req, res) => {
  res.render('admin/categories');
});

router.get('/categories/new', (req, res) => {
  res.render('admin/categories/new');
});
module.exports = router;