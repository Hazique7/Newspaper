// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // CRITICAL MISSING IMPORT

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ error: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token failed" });
  }
};

export const authorizeRole = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.userId); // Now works with import
    if (!user || user.role !== role) {
      return res.status(403).json({ error: `Access denied. Requires ${role} role.` });
    }
    next();
  };
};