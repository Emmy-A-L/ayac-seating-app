import express from "express";
import { createUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";

const router = express.Router();

// get all EXCOS
router.get("/getAllUsers", getAllUsers);

// get EXCOS by id
router.get("/getuser/:id", getUserById);

// create NEW EXCO
router.post("/createUser", createUser);
// update EXCO
router.patch("/:id", updateUser);

// delete EXCO
router.delete("/:id", (req, res) => {
  res.send("user deleted by ID: ");
});

export default router;
