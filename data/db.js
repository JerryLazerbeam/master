const Database = require('better-sqlite3');

const db = new Database('./data/freakyfashion.db', {
  verbose: console.log
});

module.exports = db;