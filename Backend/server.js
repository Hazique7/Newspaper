import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route Imports
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"; // New: Job & Application routes

dotenv.config();

const app = express();

// ======================== MIDDLEWARE ========================
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies for auth

// CORS Configuration for Next.js
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// ======================== DATABASE ========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ======================== ROUTES ========================
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes); // New: Job posting & application endpoints

// Root Health Check
app.get("/", (req, res) => res.send("NewsConnect API is running..."));

// ======================== SERVER ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));