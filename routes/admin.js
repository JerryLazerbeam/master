const express = require('express');
const router = express.Router();

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