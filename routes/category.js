const express = require('express');
const router = express.Router();
const db = require('../data/db');

const labels = {
  clothes: 'Kläder',
  shoes: 'Skor',
  accessories: 'Accessoarer'
};


router.get('/:slug', (req,res) => {

 const slug = req.params.slug;

 const products = db.prepare(`
   SELECT * FROM products
   WHERE category = ?
 `).all(slug);

 res.render('category', {
   category: labels[slug],
   products: products
 });

});

module.exports = router;