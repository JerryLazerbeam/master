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
router.get('/:category/:subcategory', (req,res) => {

 const subcategory = req.params.subcategory;

 const products = db.prepare(`
   SELECT * FROM products
   WHERE subcategory = ?
 `).all(subcategory);

 res.render('category', {
   category: subcategory,
   products
 });

});
module.exports = router;