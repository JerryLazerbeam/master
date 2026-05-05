const express = require("express");
const router = express.Router();
const db = require("../../data/db");

function createCategoryLink(name, link) {
  if (link && link.trim()) {
    const trimmedLink = link.trim();
    const linkWithoutStartSlash = trimmedLink.replace(/^\/+/, "");

    if (trimmedLink === "/news" || trimmedLink.startsWith("/category/")) {
      return trimmedLink;
    }

    if (linkWithoutStartSlash.startsWith("category/")) {
      return `/${linkWithoutStartSlash}`;
    }

    return `/category/${linkWithoutStartSlash}`;
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\u00e5/g, "a")
    .replace(/\u00e4/g, "a")
    .replace(/\u00f6/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  return `/category/${slug}`;
}

router.get("/", (req, res) => {
  const categories = db.prepare("SELECT * FROM categories").all();

  res.render("admin/categories", {
    categories,
  });
});

router.get("/new", (req, res) => {
  res.render("admin/categories/new", {
    category: null,
  });
});

router.post("/new", (req, res) => {
  const { Namn, link } = req.body;
  const categoryLink = createCategoryLink(Namn, link);

  db.prepare(`
    INSERT INTO categories (name, link)
    VALUES (?, ?)
  `).run(Namn, categoryLink);

  res.redirect("/admin/categories");
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);

  if (!category) {
    return res.redirect("/admin/categories");
  }

  res.render("admin/categories/new", {
    category,
  });
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { Namn, link } = req.body;
  const categoryLink = createCategoryLink(Namn, link);

  db.prepare(`
    UPDATE categories
    SET name = ?, link = ?
    WHERE id = ?
  `).run(Namn, categoryLink, id);

  res.redirect("/admin/categories");
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.prepare("DELETE FROM subcategories WHERE category_id = ?").run(id);
  db.prepare("DELETE FROM categories WHERE id = ?").run(id);

  res.redirect("/admin/categories");
});

module.exports = router;
