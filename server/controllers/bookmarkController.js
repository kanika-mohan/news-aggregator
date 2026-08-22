import Bookmark from "../models/Bookmark.js";

// Add bookmark
export const addBookmark = async (req, res) => {
  try {
    const {
      articleId,
      title,
      description,
      url,
      urlToImage,
      source,
      publishedAt,
    } = req.body;

    if (!articleId || !title || !url) {
      return res.status(400).json({
        message: "Article ID, title and URL are required",
      });
    }

    const existingBookmark = await Bookmark.findOne({
      user: req.user.userId,
      articleId,
    });

    if (existingBookmark) {
      return res.status(409).json({
        message: "Article already bookmarked",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user.userId,
      articleId,
      title,
      description,
      url,
      urlToImage,
      source,
      publishedAt,
    });

    res.status(201).json({
      message: "Article bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    console.error("Add bookmark error:", error);

    res.status(500).json({
      message: "Failed to add bookmark",
    });
  }
};

// Get user's bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    console.error("Get bookmarks error:", error);

    res.status(500).json({
      message: "Failed to fetch bookmarks",
    });
  }
};

// Remove bookmark
export const removeBookmark = async (req, res) => {
  try {
    const { articleId } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.userId,
      articleId,
    });

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    res.json({
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    console.error("Remove bookmark error:", error);

    res.status(500).json({
      message: "Failed to remove bookmark",
    });
  }
};