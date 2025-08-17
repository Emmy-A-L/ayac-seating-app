import express from "express";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Sign JWT - Use environment variable
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // MUST be true for HTTPS (both domains are HTTPS)
      sameSite: "none", // CRITICAL for cross-origin cookies
      maxAge: 3600000, // 1 hour
      path: "/", // Explicit path
    });

    res.json({
      message: "Login successful",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Protected route: get current user
router.get("/validate", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    console.log("Token: ", token);
    console.log("Request info: ", req.cookies);
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use proper async database query
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Token validation error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ Logout route: clear cookie
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });
  res.json({ message: "Logged out successfully" });
});

export default router;
