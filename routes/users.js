const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.json({ error: 'Alla fält måste fyllas i' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO users (firstname, lastname, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(firstname, lastname, email, password, 'user');

    req.session.user = {
      id: result.lastInsertRowid,
      firstname,
      email,
      role: 'user'
    };

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    const error = e.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ? 'E-postadressen används redan'
      : 'Något gick fel';

    res.json({ error });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

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
    firstname: user.firstname,
    email: user.email,
    role: user.role
  };

  if (user.role === 'admin') {
    return res.redirect('/admin/products');
  }

  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
