// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import DB connection
const connectDB = require("./config/db");

// Import routes
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   MIDDLEWARES
========================= */

// Enable CORS (allow frontend + admin UI)
app.use(
  cors({
    origin: "*", // allow all (safe for demo)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-admin-key"]
  })
);

// Parse JSON body
app.use(express.json());

/* =========================
   ROUTES
========================= */

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Cloth Chatbot Backend is Live 🚀"
  });
});

// Chatbot API
app.use("/chat", chatRoutes);

// Admin API
app.use("/admin", adminRoutes);

/* =========================
   ERROR HANDLING
========================= */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal server error ❌" });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
