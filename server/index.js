const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:4200" })); // Allow frontend requests
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const gadgetRoutes = require("./routes/gadgets");

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
