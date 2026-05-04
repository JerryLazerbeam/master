var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const fs = require('fs');
const db = require('./data/db');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRoutes = require('./routes/products');
const adminRouter = require('./routes/admin/index');
const categoryRoutes = require('./routes/category');
const searchRouter = require('./routes/search');
const favoritesRouter = require('./routes/favorites');
const basketRouter = require('./routes/basket');
const checkoutRouter = require('./routes/checkout');
const newsRouter = require('./routes/news');
const productsRouter = require('./routes/admin/products');

var app = express();


// =========================
// RESET DB ROUTE
// =========================
app.get('/reset-db', (req, res) => {
  db.exec(`
    DROP TABLE IF EXISTS subcategories;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
  `);

  const sql = fs.readFileSync('./data/freakyfashion.sql', 'utf8');
  db.exec(sql);

  res.send('DB reset');
});


// =========================
// VIEW ENGINE
// =========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// =========================
// MIDDLEWARE
// =========================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'hemlig-nyckel',resave: false,saveUninitialized: false}));

/* 
app.use(session({
  secret: 'freakyfashion-secret',
  resave: false,
  saveUninitialized: false
}));
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.favoriteProductIds = req.session.favoriteProductIds || [];
  next();
});



// =========================
// GLOBAL DATA (categories)
// =========================
app.use((req, res, next) => {
  const categories = db.prepare('SELECT * FROM categories').all();
  const subcategories = db.prepare('SELECT * FROM subcategories').all();

const categoriesWithSubs = categories.map(category => {
    return {
      ...category,
      subcategories: subcategories.filter(sub => sub.category_id === category.id)
 }; 
});

  res.locals.categories = categoriesWithSubs;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// =========================
// ROUTES
// =========================
app.use('/favorites', favoritesRouter);
app.use('/products', productRoutes);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/admin/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRoutes);
app.use('/search', searchRouter);
app.use('/basket', basketRouter);
app.use('/checkout', checkoutRouter);
app.use('/news', newsRouter);



// =========================
// ERROR HANDLING
// =========================
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
