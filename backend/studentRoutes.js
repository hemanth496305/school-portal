const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await Student.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already exists" });

    const student = new Student({ username, password });
    await student.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = await Student.findOne({ username });
    if (!student || student.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

