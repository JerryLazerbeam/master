CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0)
);


INSERT INTO products (name, price)
VALUES
('Svart T-Shirt', 199),
('Vit T-Shirt', 199);



CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

INSERT INTO categories (name)
VALUES
('Nyheter'),
('Kläder'),
('Accessoarer'),
('Skor');

--Add a link column to the categories table and update it with appropriate links
SELECT * FROM categories;
ALTER TABLE categories ADD COLUMN link TEXT;
UPDATE categories SET link = '/news' WHERE name = 'Nyheter';
UPDATE categories SET link = '/clothes' WHERE name = 'Kläder';
UPDATE categories SET link = '/accessories' WHERE name = 'Accessoarer';
UPDATE categories SET link = '/shoes' WHERE name = 'Skor';
