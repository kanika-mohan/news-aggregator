import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

export const fetchTopHeadlines = async ({
  country = "us",
  category,
  page = 1,
  pageSize = 20,
} = {}) => {
  try {
    const params = {
      country,
      page,
      pageSize,
      apiKey: process.env.NEWS_API_KEY,
    };

    if (category) {
      params.category = category;
    }

    const response = await axios.get(NEWS_API_URL, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "News API error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to fetch news");
  }
};