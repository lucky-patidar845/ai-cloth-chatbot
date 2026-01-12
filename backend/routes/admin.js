const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* =====================================================
   🔐 SIMPLE ADMIN AUTH (BASIC LEVEL)
   -----------------------------------------------------
   For now we use a secret key.
   Later this can be JWT / login system.
   ===================================================== */

const ADMIN_KEY = process.env.ADMIN_KEY || "secret123";

// Middleware to protect admin routes
function adminAuth(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (key !== ADMIN_KEY) {
    return res.status(401).json({
      message: "Unauthorized: Invalid admin key"
    });
  }
  next();
}

/* =====================================================
   ➕ ADD NEW PRODUCT
   ===================================================== */
router.post("/add-product", adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json({
      message: "Product added successfully ✅",
      product
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message
    });
  }
});

/* =====================================================
   📋 GET ALL PRODUCTS
   ===================================================== */
router.get("/products", adminAuth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* =====================================================
   ✏️ UPDATE PRODUCT
   ===================================================== */
router.put("/update-product/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully ✨",
      updated
    });
  } catch (error) {
    res.status(400).json({
      message: "Update failed",
      error: error.message
    });
  }
});

/* =====================================================
   ❌ DELETE PRODUCT
   ===================================================== */
router.delete("/delete-product/:id", adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully 🗑️"
    });
  } catch (error) {
    res.status(400).json({
      message: "Delete failed",
      error: error.message
    });
  }
});

module.exports = router;
