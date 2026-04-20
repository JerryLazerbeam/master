var express = require('express');
var router = express.Router();

// Importera db-objektet - vi behöver detta för att kommunicera med databasen
const db = require('../data/db');

// GET /
router.get('/', function(req, res, next) {
  try {
    const select = db.prepare('SELECT * FROM products');
    const products = select.all();

    res.render('index', {
      title: 'FreakyFashion',
      products
    });

  } catch (error) {
    console.log(error);
    res.send("ERROR KOLLA TERMINAL");
  }
});

router.get('/basket', (req, res) => {
  res.render('basket');
});

module.exports = router;