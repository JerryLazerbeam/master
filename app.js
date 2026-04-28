var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require('fs');
const db = require('./data/db');
const session = require('express-session');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRoutes = require('./routes/products');
const adminRouter = require('./routes/admin/index');

var app = express();


// =========================
// RESET DB ROUTE
// =========================
app.get('/reset-db', (req, res) => {
  db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
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
app.use(express.static(path.join(__dirname, 'public')));


// =========================
// GLOBAL DATA (categories)
// =========================
app.use((req, res, next) => {
  const categories = db.prepare('SELECT * FROM categories').all();
  res.locals.categories = categories;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// =========================
// ROUTES
// =========================
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/products', productRoutes);
app.use('/admin', adminRouter);



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