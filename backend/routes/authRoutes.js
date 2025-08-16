import express from "express";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required!" });
  }
  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }
    
    res.status(200).json({
      message: "Login successful",
      data: {
        userId: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phone: existingUser.phone,
      },
      
    });
  } catch (error) {
    console.error("Error durin Login: ", error);
    res
      .status(500)
      .json({ message: "Inrernal server error", error: error.message });
  }
});

export default router;
