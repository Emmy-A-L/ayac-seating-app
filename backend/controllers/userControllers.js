import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    let user = req.body;
    console.log(user);
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }
    // hash password from front end

    const salt = await bcrypt.genSalt(10); // gen salt rounds
    const hashedPassword = await bcrypt.hash(user.password, salt); // hash the password
    user.password = hashedPassword; // replace password with hashed password

    let newUser = new User(user);
    newUser.save();

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, {password: 0});
    res.status(200).json({
      message: "Data retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      message: "ID is required",
    });
  }

  try {
    const user = await User.findById(userId, {password: 0});
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist on our database!" });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(400).json({
      message: "Id does not exist in database",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { fullName, email, phone, password } = req.body;
  if (!userId) {
    return res.status(400).json({
      message: "ID is required",
    });
  }

  try {
    const existingUser = User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error Updating user:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
