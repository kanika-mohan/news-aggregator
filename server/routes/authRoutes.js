import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updatePreferences,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Current user
router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.put(
  "/preferences",
  authMiddleware,
  updatePreferences
);

export default router;