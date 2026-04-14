var express = require('express');
var router = express.Router();

// Importera db-objektet - vi behöver detta för att kommunicera med databasen
const db = require('../data/db');

// GET /
router.get('/', function(req, res, next) {

  const select = db.prepare('SELECT * FROM products');

  const products = select.all();

  res.render('index', {
    title: 'FreakyFashion',
    products
  });
});

module.exports = router;