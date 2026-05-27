import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/appError.js";

// *============================================================

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new AppError("You are not logged in", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = decoded;
  next();
});

// *============================================================

export const roleBaseMiddleware = (requiredRole) => {
  return asyncHandler((req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      throw new AppError("Access Denied. You are not authorized.", 403);
    }
    next();
  });
};
