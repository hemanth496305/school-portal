import express from "express";
import { getTimetable } from "../controllers/employeeController.js";

const router = express.Router();
router.get("/timetable", getTimetable);
export default router;

