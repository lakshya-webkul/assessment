const express = require("express");
const db = require("../db/db");

const router = express.Router();

// Middleware to Check Authentication
const isAuthenticated = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};

router.get("/", isAuthenticated, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  db.all("SELECT * FROM gadgets LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get("SELECT COUNT(*) AS count FROM gadgets", [], (err, countResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        gadgets: rows,
        total: countResult.count,
        page,
        totalPages: Math.ceil(countResult.count / limit),
      });
    });
  });
});


router.post("/", isAuthenticated, (req, res) => {
  const { name, description } = req.body;

  db.run("INSERT INTO gadgets (name, description) VALUES (?, ?)", [name, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, description });
  });
});


router.delete("/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM gadgets WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Gadget deleted successfully" });
  });
});

module.exports = router;
