require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    category: "men",
    product: "shirt",
    material: "cotton",
    price: 899,
    stock: true,
    colors: ["blue", "black"],
    sizes: ["M", "L", "XL"]
  },
  {
    category: "women",
    product: "kurti",
    material: "rayon",
    price: 1299,
    stock: true,
    colors: ["red", "green"],
    sizes: ["M", "L"]
  }
];

async function seedData() {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    
    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
