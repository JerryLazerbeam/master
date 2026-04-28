var express = require('express');
var router = express.Router();
const db = require('../data/db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare(`
    SELECT * FROM users
    WHERE email = ? AND password = ?
  `).get(email, password);

  if (!user) {
    return res.redirect('/login');
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  if (user.role === 'admin') {
    return res.redirect('/admin/products');
  }

  res.redirect('/');
});
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const existingUser = db.prepare(`
    SELECT * FROM users
    WHERE email = ?
  `).get(email);

  if (existingUser) {
    return res.redirect('/login');
  }

  db.prepare(`
    INSERT INTO users (email, password, role)
    VALUES (?, ?, ?)
  `).run(email, password, 'user');

  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
