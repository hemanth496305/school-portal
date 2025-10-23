import express from "express";
import { addEmployee, addStudent, getDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", getDashboard);
router.post("/employee", addEmployee);
router.post("/student", addStudent);

export default router;

