require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
console.log("MONGO_URI present:", !!process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const chatRoute = require("./routes/chat");
app.use("/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
