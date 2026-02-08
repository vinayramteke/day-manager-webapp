// ================================================================
// FILE: server.js
// LOCATION: Create a folder named 'backend', put this file inside.
// COMMAND TO RUN: node server.js
// ================================================================

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
const JWT_SECRET = "my_temp_secret_key_123"; // In a real app, use .env file

// Middleware
app.use(cors());
app.use(express.json());

// --- 1. Database Connection ---

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/day-manager")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- 2. Database Models ---

// User Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Data Model (Stores tasks, activities, budget)
const DataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  activities: { type: Array, default: [] },
  tasks: { type: Array, default: [] },
  budget: { type: Number, default: 24 },
});
const Data = mongoose.model("Data", DataSchema);

// --- 3. Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// --- 4. Routes ---

// Register Route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create empty Data bucket for this user
    await new Data({ userId: user._id }).save();

    // Create Token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during register" });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find User
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    // Create Token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get Data Route (Protected)
app.get("/api/data", authenticateToken, async (req, res) => {
  try {
    let data = await Data.findOne({ userId: req.user.id });
    if (!data) {
      // If data missing for some reason, create it
      data = await new Data({ userId: req.user.id }).save();
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Sync Data Route (Protected) - Saves your frontend state to DB
app.post("/api/data", authenticateToken, async (req, res) => {
  const { activities, tasks, budget } = req.body;
  try {
    const updatedData = await Data.findOneAndUpdate(
      { userId: req.user.id },
      { activities, tasks, budget },
      { new: true, upsert: true },
    );
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: "Error syncing data" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
