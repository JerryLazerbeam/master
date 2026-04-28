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
('Freaky Fashion est.2026', 199, 'est2026', 'Est2026', '/images/selected/FFest2026.jpg', 'Freaky Fashion'),
('Freaky Fashion Clock Gold', 199, 'clock-gold', 'Clock Gold', '/images/selected/FFclockgold.jpg', 'Freaky Fashion'),
('Freaky Fashion Clock Silver', 199, 'clock-silver', 'Clock Silver', '/images/selected/FFclocksilver.jpg', 'Freaky Fashion'),
('Freaky Fashion Hoodie Black', 199, 'hoodie-black', 'Hoodie Black', '/images/selected/FFhoodieblack.jpg', 'Freaky Fashion'),
('Freaky Fashion Hoodie Navy', 199, 'hoodie-navy', 'Hoodie Navy', '/images/selected/FFhoodienavy.jpg', 'Freaky Fashion'),
('Freaky Fashion Hoodie off-white', 199, 'hoodie-off-white', 'Hoodie Off-White', '/images/selected/FFhoodieoffwhite.jpg', 'Freaky Fashion'),
('Freaky Fashion Hoodie Rose', 199, 'hoodie-rose', 'Hoodie Rose', '/images/selected/FFoffwhiterose.jpg', 'Freaky Fashion'),
('Freaky Fashion Sneaker Black', 199, 'sneaker-black', 'Sneaker Black', '/images/selected/FFsneakerblack.jpg', 'Freaky Fashion'),
('Freaky Fashion Sneaker Original', 199, 'sneaker-original', 'Sneaker Original', '/images/selected/FFsneakeroriginalrubber.jpg', 'Freaky Fashion'),
('Freaky Fashion Sneaker White', 199, 'sneaker-white', 'Sneaker White', '/images/selected/FFsneakervwhite.jpg', 'Freaky Fashion'),
('Freaky Fashion FFS Boot', 199, 'ffs-boot', 'FFS Boot', '/images/selected/FFbootbrun.jpg', 'Freaky Fashion'),
('Freaky Fashion Boot Black', 199, 'boot-black', 'Boot Black', '/images/selected/FFleathersvart.jpg', 'Freaky Fashion'),
('Freaky Fashion Boot Brown', 199, 'boot-brown', 'Boot Brown', '/images/selected/FFleatherbrun.jpg', 'Freaky Fashion');

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
UPDATE categories SET link='/category/clothes'WHERE name='Kläder';
UPDATE categories SET link='/category/accessories'WHERE name='Accessoarer';
UPDATE categories SET link='/category/shoes'WHERE name='Skor';

ALTER TABLE products ADD COLUMN category TEXT;

UPDATE products SET category='clothes'
WHERE slug='svart-tshirt';
UPDATE products SET category='clothes'
WHERE slug='vit-tshirt';
UPDATE products SET category='clothes'
WHERE slug='beige-tshirt';
UPDATE products SET category='clothes'
WHERE slug='off-white-pink-tshirt';
UPDATE products SET category='clothes'
WHERE slug='grå-tshirt';
UPDATE products SET category='clothes'
WHERE slug='grön-tshirt';
UPDATE products SET category='clothes'
WHERE slug='navy-tshirt';
UPDATE products SET category='clothes'
WHERE slug='pink-tattoo-tshirt';
UPDATE products SET category='clothes'
WHERE slug='ljusbrun-tshirt';
UPDATE products SET category='clothes'
WHERE slug='pink-tshirt';
UPDATE products SET category='clothes'
WHERE slug='knives';
UPDATE products SET category='clothes'
WHERE slug='est2026';

UPDATE products SET category='shoes'
WHERE slug='sneaker-black';
UPDATE products SET category='shoes'
WHERE slug='sneaker-original';
UPDATE products SET category='shoes'
WHERE slug='sneaker-white';

UPDATE products SET category='accessories'
WHERE slug='clock-gold';
UPDATE products SET category='accessories'
WHERE slug='clock-silver';

UPDATE products SET category='clothes'
WHERE slug='hoodie-black';
UPDATE products SET category='clothes'
WHERE slug='hoodie-navy';
UPDATE products SET category='clothes'
WHERE slug='hoodie-off-white';
UPDATE products SET category='clothes'
WHERE slug='hoodie-rose';