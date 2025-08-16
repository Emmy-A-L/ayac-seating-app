import express from "express";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Sign JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  // Send as cookie (safer than localStorage)
  res.cookie("token", token, {
    httpOnly: true, // not accessible from JS
    secure: false,  // set true if using https
    sameSite: "strict"
  });

  res.json({ message: "Login successful" });
});

// ✅ Protected route: get current user
router.get("/auth/validate", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user.id, fullName: user.fullName, email: user.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ Logout route: clear cookie
router.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
