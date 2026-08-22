import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const getNews = async ({
  country = "us",
  category = "",
  page = 1,
} = {}) => {
  const response = await api.get("/news/headlines", {
    params: {
      country,
      category: category || undefined,
      page,
    },
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addBookmark = async (article) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/bookmarks",
    {
      articleId: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source?.name || "",
      publishedAt: article.publishedAt,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getBookmarks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/bookmarks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeBookmark = async (articleId) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/bookmarks/${encodeURIComponent(articleId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addHistory = async (articleData) => {
  const response = await api.post("/history", articleData);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

export const removeHistory = async (articleId) => {
  const response = await api.delete(
    `/history/${articleId}`
  );
  return response.data;
};

export const clearHistory = async () => {
  const response = await api.delete("/history");
  return response.data;
};

export const updatePreferences = async (preferredCategories) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/auth/preferences",
    {
      preferredCategories,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default api;