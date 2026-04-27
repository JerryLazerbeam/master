CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  slug TEXT,
  description TEXT,
  image TEXT,
  brand TEXT
);

INSERT INTO products (name, price, slug, description, image, brand)
VALUES
('Freaky Fashion svart t-shirt', 199, 'svart-tshirt', 'Svart t-shirt', '/images/selected/FFsvart.jpg', 'Freaky Fashion'),
('Freaky Fashion vit t-shirt', 199, 'vit-tshirt', 'Vit t-shirt', '/images/selected/FFvit.jpg', 'Freaky Fashion'),
('Freaky Fashion off-white t-shirt', 199, 'off-white-pink-tshirt', 'Off-white pink t-shirt', '/images/selected/FFoffwhitepink.jpg', 'Freaky Fashion'),
('Freaky Fashion beige t-shirt', 199, 'beige-tshirt', 'Beige t-shirt', '/images/selected/FFbeige.jpg', 'Freaky Fashion'),
('Freaky Fashion grå t-shirt', 199, 'grå-tshirt', 'Grå t-shirt', '/images/selected/FFgrey.jpg', 'Freaky Fashion'),
('Freaky Fashion grön t-shirt', 199, 'grön-tshirt', 'Grön t-shirt', '/images/selected/FFgreen.jpg', 'Freaky Fashion'),
('Freaky Fashion navy t-shirt', 199, 'navy-tshirt', 'Navy t-shirt', '/images/selected/FFnavy.jpg', 'Freaky Fashion'),
('Freaky Fashion pink tattoo t-shirt', 199, 'pink-tattoo-tshirt', 'Pink tattoo t-shirt', '/images/selected/FFpinktattoo.jpg', 'Freaky Fashion'),
('Freaky Fashion ljusbrun t-shirt', 199, 'ljusbrun-tshirt', 'Ljusbrun t-shirt', '/images/selected/FFljusbrun.jpg', 'Freaky Fashion'),
('Freaky Fashion pink t-shirt', 199, 'pink-tshirt', 'Pink t-shirt', '/images/selected/FFpink.jpg', 'Freaky Fashion'),
('Freaky Fashion Knives', 199, 'knives', 'Knives', '/images/selected/FFknives.jpg', 'Freaky Fashion'),
('Freaky Fashion est.2026', 199, 'est2026', 'Est2026', '/images/selected/FFest2026.jpg', 'Freaky Fashion');

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
