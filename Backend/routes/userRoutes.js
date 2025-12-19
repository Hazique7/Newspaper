import express from "express";
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserProfile // This must match the name in userController.js
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile); // Protected route

export default router;