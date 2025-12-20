import express from "express";
import { 
  createJob, 
  getAllJobs,             // <--- Added (For Job Board)
  applyToJob, 
  getJobApplicants, 
  getUserApplications,    // <--- Added (For Job Seeker Notifications)
  updateApplicationStatus 
} from "../controllers/jobController.js";
import { protect, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Public Route: Fetch all jobs (for the Job Board)
router.get("/", getAllJobs); 

// 2. Newspaper Routes
router.post("/", protect, authorizeRole('Newspaper'), createJob);
router.get("/applicants", protect, authorizeRole('Newspaper'), getJobApplicants);
router.patch("/applications/:id/status", protect, authorizeRole('Newspaper'), updateApplicationStatus);

// 3. Job Seeker Routes
router.post("/apply/:jobId", protect, authorizeRole('JobSeeker'), applyToJob);
router.get("/my-applications", protect, authorizeRole('JobSeeker'), getUserApplications);

export default router;