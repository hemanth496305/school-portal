import express from "express";
import { getProfile, getTimetable } from "../controllers/studentController.js";

const router = express.Router();
router.get("/profile", getProfile);
router.get("/timetable", getTimetable);
export default router;

