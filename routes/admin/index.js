const express = require('express');
const router = express.Router();
const db = require('../../data/db');

router.use((req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }

  next();
});

router.get('/products/new', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories').all();
const subcategories = db.prepare('SELECT * FROM subcategories').all();

res.render('admin/products/new', {
  categories,
  subcategories
});
});

router.get('/categories', (req, res) => {
  res.render('admin/categories');
});

router.get('/categories/new', (req, res) => {
  res.render('admin/categories/new');
});
module.exports = router;