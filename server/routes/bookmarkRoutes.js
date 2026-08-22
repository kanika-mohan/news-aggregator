import express from "express";

import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "../controllers/bookmarkController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add bookmark
router.post("/", authMiddleware, addBookmark);

// Get logged-in user's bookmarks
router.get("/", authMiddleware, getBookmarks);

// Remove bookmark
router.delete("/:articleId", authMiddleware, removeBookmark);

export default router;