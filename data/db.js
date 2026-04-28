const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'freakyfashion.db');
const sqlPath = path.join(__dirname, 'freakyfashion.sql');

const db = new Database(dbPath);

const table = db.prepare(`
  SELECT name FROM sqlite_master WHERE type='table' AND name='categories'
`).get();

if (!table) {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  db.exec(sql);
  console.log("Database created automatically");
}

const count = db.prepare('SELECT COUNT(*) as count FROM categories').get();

if (count.count === 0) {
  db.exec(`
    INSERT INTO categories (name)
    VALUES
    ('Nyheter'),
    ('Kläder'),
    ('Accessoarer'),
    ('Skor')
  `);
}
db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

module.exports = db;