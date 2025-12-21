import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1. Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists first
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    
    // Return safe user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Cookie settings
    res.cookie("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict"
    });

    res.json({ 
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Profile
export const getProfile = async (req, res) => {
  try {
    // req.userId comes from the 'protect' middleware
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

// 5. Update Profile (Resume Upload Logic)
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update basic fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // Update Profile object fields (Nested)
    if (req.body.profile) {
      user.profile = {
        ...user.profile, // Keep existing fields
        ...req.body.profile // Overwrite with new ones (e.g. resumeLink)
      };
    }

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profile: updatedUser.profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};