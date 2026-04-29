const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req,res)=>{

const products = db.prepare(`
SELECT *
FROM products
WHERE datetime(created_at) >= datetime('now','-30 days')
ORDER BY created_at DESC
`).all();

res.render('news', {
 title: 'Alla nyheter',
 products
});

});

router.get('/latest', (req,res)=>{

const products = db.prepare(`
SELECT *
FROM products
WHERE datetime(created_at) >= datetime('now','-7 days')
ORDER BY created_at DESC
LIMIT 8
`).all();

res.render('news',{
 title: 'Senaste inkommet',
 products
});

});
module.exports = router;