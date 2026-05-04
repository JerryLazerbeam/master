const express = require("express");
const router = express.Router();
const db = require("../../data/db");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/new", upload.single("bild"), (req, res) => {
  const { Namn, Pris, sku, beskrivning, brand, category, subcategory } =
    req.body;

  const slug = Namn.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const imagePath = req.file ? "/images/uploads/" + req.file.filename : null;

  db.prepare(
    `
  INSERT INTO products 
  (name, price, image, slug, sku, description, brand, category, subcategory)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`,
  ).run(
    Namn,
    Pris,
    imagePath,
    slug,
    sku,
    beskrivning,
    brand,
    category,
    subcategory,
  );
  res.redirect("/admin/products");
});

router.get("/new", (req, res) => {
  const categories = db.prepare("SELECT * FROM categories").all();
  const subcategories = db.prepare("SELECT * FROM subcategories").all();

  res.render("admin/products/new", {
    product: null,
    categories,
    subcategories,
  });
});

router.get("/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();

  res.render("admin/products", {
    products,
  });
});
router.get("/", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();

  res.render("admin/products", { products });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  const categories = db.prepare('SELECT * FROM categories').all();
  const subcategories = db.prepare('SELECT * FROM subcategories').all();

  res.render('admin/products/new', {
    product,
    categories,
    subcategories
  });
});

router.post('/edit/:id', upload.single('bild'), (req, res) => {
  const id = req.params.id;

  const { Namn, Pris, brand, beskrivning, sku, category, subcategory } = req.body;

  const imagePath = req.file
    ? '/images/uploads/' + req.file.filename
    : null;

  db.prepare(`
    UPDATE products
    SET name = ?, price = ?, brand = ?, description = ?, sku = ?, category = ?, subcategory = ?, image = COALESCE(?, image)
    WHERE id = ?
  `).run(Namn, Pris, brand, beskrivning, sku, category, subcategory, imagePath, id);

  res.redirect('/admin/products');
});

router.post('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.prepare('DELETE FROM products WHERE id = ?').run(id);

  res.redirect('/admin/products');
});
module.exports = router;
