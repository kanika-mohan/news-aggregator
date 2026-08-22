import express from "express";

import {
  addHistory,
  getHistory,
  removeHistory,
  clearHistory,
} from "../controllers/historyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add article to history
router.post("/", authMiddleware, addHistory);

// Get user's history
router.get("/", authMiddleware, getHistory);

// Remove one history item
router.delete("/:articleId", authMiddleware, removeHistory);

// Clear all history
router.delete("/", authMiddleware, clearHistory);

export default router;