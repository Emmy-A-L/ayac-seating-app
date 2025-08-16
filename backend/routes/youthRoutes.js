import express from "express";
import { createYouthInfo, getAllYouthInfo, getYouthInfoByName, updateYouthInfo } from "../controllers/youthControllers.js";

const router = express.Router();

// get all youth info
router.get("/getAllYouthInfo", getAllYouthInfo);

// create youth info
router.post("/createYouthInfo", createYouthInfo);

// get youth info by name
router.get("/getYouthInfoByName/:fullName", getYouthInfoByName);

//update youth info
router.patch("/updateYouthInfo/:fullName", updateYouthInfo)

export default router;
