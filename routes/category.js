const express = require('express');
const router = express.Router();
const db = require('../data/db');

const labels = {
  clothes: 'Kläder',
  shoes: 'Skor',
  accessories: 'Accessoarer',
  tshirts: 'T-shirts',
  hoodies: 'Hoodies',
  sneakers: 'Sneakers',
  boots: 'Boots',
  watches: 'Klockor'
};

router.get('/:category/:subcategory', (req,res) => {

 const subcategory = req.params.subcategory;

 const products = db.prepare(`
   SELECT * FROM products
   WHERE subcategory = ?
 `).all(subcategory);

 res.render('category', {
   category: labels[subcategory],
   products
 });

});
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