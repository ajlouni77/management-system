const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM products WHERE is_deleted = false"
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    const { name, category, price, quantity } = req.body;
    try {
      await pool.query(
        "INSERT INTO products (name, category, price, quantity) VALUES ($1, $2, $3, $4)",
        [name, category, price, quantity]
      );
      res.json({ message: "تمت إضافة المنتج بنجاح!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;
    try {
      await pool.query(
        "UPDATE products SET name=$1, category=$2, price=$3, quantity=$4 WHERE id=$5",
        [name, category, price, quantity, id]
      );
      res.json({ message: "تم تحديث المنتج!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("UPDATE products SET is_deleted=true WHERE id=$1", [id]);
      res.json({ message: "تم حذف المنتج (Soft Delete)" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
