import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authorizeRole = (role) => async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user || user.role !== role)
    return res.status(403).json({ error: "Forbidden" });
  next();
};
