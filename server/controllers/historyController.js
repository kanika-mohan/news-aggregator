import History from "../models/History.js";

// Add article to history
export const addHistory = async (req, res) => {
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

    // Check if the article is already in history
    const existingHistory = await History.findOne({
      user: req.user.userId,
      articleId,
    });

    if (existingHistory) {
      // Update viewed time
      existingHistory.viewedAt = new Date();

      await existingHistory.save();

      return res.status(200).json({
        message: "History updated successfully",
        history: existingHistory,
      });
    }

    // Create new history record
    const history = await History.create({
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
      message: "Article added to history",
      history,
    });
  } catch (error) {
    console.error("Add history error:", error);

    res.status(500).json({
      message: "Failed to add article to history",
    });
  }
};

// Get user's history
export const getHistory = async (req, res) => {
  try {
    const history = await History.find({
      user: req.user.userId,
    }).sort({ viewedAt: -1 });

    res.json({
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Get history error:", error);

    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};

// Remove one history item
export const removeHistory = async (req, res) => {
  try {
    const { articleId } = req.params;

    const history = await History.findOneAndDelete({
      user: req.user.userId,
      articleId,
    });

    if (!history) {
      return res.status(404).json({
        message: "History item not found",
      });
    }

    res.json({
      message: "History item removed successfully",
    });
  } catch (error) {
    console.error("Remove history error:", error);

    res.status(500).json({
      message: "Failed to remove history item",
    });
  }
};

// Clear all history
export const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({
      user: req.user.userId,
    });

    res.json({
      message: "History cleared successfully",
    });
  } catch (error) {
    console.error("Clear history error:", error);

    res.status(500).json({
      message: "Failed to clear history",
    });
  }
};