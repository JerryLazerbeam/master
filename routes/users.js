const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/register', (req, res) => {
  res.render('register');
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

router.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.render('register', { error: 'Alla fält måste fyllas i' });
  }

  try {
    const result = db.prepare(`
  INSERT INTO users (firstname, lastname, email, password)
  VALUES (?, ?, ?, ?)
`).run(firstname, lastname, email, password);

req.session.user = {
  id: result.lastInsertRowid,
  firstname
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

  if (!email || !password) {
    return res.json({ error: 'Fyll i alla fält' });
  }

  try {
    const user = db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).get(email);

    if (!user) {
      return res.json({ error: 'Fel e-post eller lösenord' });
    }

    // Jämför lösenord direkt (utan bcrypt)
    if (password !== user.password) {
      return res.json({ error: 'Fel e-post eller lösenord' });
    }

    //  Sätt session
    req.session.user = {
      id: user.id,
      firstname: user.firstname
    };

    // Skicka svar till frontend
    res.json({ success: true });

  } catch (e) {
    console.log(e);
    res.json({ error: 'Något gick fel' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


module.exports = router;
