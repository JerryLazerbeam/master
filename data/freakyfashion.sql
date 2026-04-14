CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0)
);


INSERT INTO products (name, price)
VALUES
('Svart T-Shirt', 199),
('Vit T-Shirt', 199);
