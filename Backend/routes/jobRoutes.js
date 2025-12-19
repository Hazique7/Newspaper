import express from "express";
import { 
  createJob, 
  applyToJob, 
  getJobApplicants, 
  updateApplicationStatus // Ensure this matches the controller export
} from "../controllers/jobController.js";
import { protect, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRole('Newspaper'), createJob);
router.post("/apply/:jobId", protect, authorizeRole('JobSeeker'), applyToJob);
router.get("/applicants", protect, authorizeRole('Newspaper'), getJobApplicants);

// This line uses the function that was causing your error
router.patch("/applications/:id/status", protect, authorizeRole('Newspaper'), updateApplicationStatus);

export default router;