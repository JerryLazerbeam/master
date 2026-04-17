const Database = require('better-sqlite3');

const db = new Database('./data/freakyfashion.db', {
  verbose: console.log
});

db.prepare('DELETE FROM categories').run();

const count = db.prepare('SELECT COUNT(*) as count FROM categories').get();

if (count.count === 0) {
  db.prepare(`
    INSERT INTO categories (name)
    VALUES ('Nyheter'), ('Kläder'), ('Accessoarer'), ('Skor')
  `).run();
}
module.exports = db;