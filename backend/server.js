import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/student", studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

