const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: String,
  product: String,
  material: String,
  price: Number,
  stock: Boolean,
  colors: [String],
  sizes: [String]
});

module.exports = mongoose.model("Product", productSchema);
