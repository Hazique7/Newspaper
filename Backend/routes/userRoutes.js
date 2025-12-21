import express from "express";
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getProfile,        // Matches your controller
  updateUserProfile  // <--- ADD THIS IMPORT
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile); // <--- ADD THIS ROUTE

export default router;