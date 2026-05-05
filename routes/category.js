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
 const subcategoryLink = `/category/${req.params.category}/${subcategory}`;
 const subcategoryPage = db.prepare(`
   SELECT * FROM subcategories
   WHERE link = ?
 `).get(subcategoryLink);

 const products = db.prepare(`
   SELECT * FROM products
   WHERE subcategory = ?
 `).all(subcategory);

 res.render('category', {
   category: subcategoryPage ? subcategoryPage.name : labels[subcategory],
   products
 });

});
router.get('/:slug', (req,res) => {

 const slug = req.params.slug;
 const categoryLink = `/category/${slug}`;
 const categoryPage = db.prepare(`
   SELECT * FROM categories
   WHERE link = ?
 `).get(categoryLink);

 if (!categoryPage) {
   return res.status(404).render('error', {
     message: 'Category not found',
     error: {}
   });
 }

 const products = db.prepare(`
   SELECT * FROM products
   WHERE category = ?
 `).all(slug);

 res.render('category', {
   category: categoryPage.name,
   products: products
 });

});
module.exports = router;
