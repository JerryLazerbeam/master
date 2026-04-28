var express = require('express');
var router = express.Router();

// Importera db-objektet - vi behöver detta för att kommunicera med databasen
const db = require('../data/db');

// GET /
router.get('/', function(req, res, next) {
  try {
    const select = db.prepare('SELECT * FROM products');
    const products = select.all();
    const notFound = req.query.notFound || '';

    res.render('index',{
      title: 'FreakyFashion',
      products,
      notFound
    });

  } catch (error) {
    console.log(error);
    res.send("ERROR KOLLA TERMINAL");
  }
});
router.get('/login', (req, res,) => {
  res.render('login');
});
router.get('/basket', (req, res) => {
  res.render('basket');
});
router.get('/products', (req, res) => {
  res.render('products');
});
router.get('/clothes', (req, res) => {
  res.render('clothes');
});
router.get('/accessories', (req, res) => {
  res.render('accessories');
});
router.get('/shoes', (req, res) => {
  res.render('shoes');
});
router.get('/selected-favorites', (req, res) => {
  res.render('selected-favorites');
});
router.get('/news', (req, res) => {
  res.render('news');
});
module.exports = router;
