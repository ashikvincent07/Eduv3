const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered. Please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: "User registered successfully. You can now log in." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Common Profile API for both Student and Teacher
router.get("/profile", async (req, res) => {
  try {
    // Extract token from headers
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send profile based on role
      res.json({
        name: user.name,
        email: user.email,
        role: user.role,
        classrooms: user.role === "teacher" ? user.classrooms : undefined,
      });
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
