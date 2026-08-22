import { fetchTopHeadlines } from "../services/newsService.js";

export const getTopHeadlines = async (req, res) => {
  try {
    const { country = "us", category, page = 1 } = req.query;

    const news = await fetchTopHeadlines({
      country,
      category,
      page: Number(page),
      pageSize: 20,
    });

    res.status(200).json(news);
  } catch (error) {
    console.error("News controller error:", error.message);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
};