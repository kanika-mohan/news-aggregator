import { useEffect, useState } from "react";
import {
  Bookmark,
  BarChart3,
  Clock3,
  LogOut,
  Newspaper,
  Search,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  getNews,
  getCurrentUser,
  addBookmark,
  getBookmarks,
  removeBookmark,
  addHistory,
} from "../services/api";

const categories = [
  "All",
  "Technology",
  "Business",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
];

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [news, setNews] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [preferredCategories, setPreferredCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =========================
  // LOAD NEWS
  // =========================

  const loadNews = async (category = "All") => {
    try {
      setLoading(true);
      setError("");

      const data = await getNews({
        country: "us",
        category:
          category === "All"
            ? ""
            : category.toLowerCase(),
      });

      setNews(data.articles || []);
    } catch (error) {
      console.error("News loading error:", error);
      setError(
        "Unable to load news. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD BOOKMARKS
  // =========================

  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();

      const ids = (data.bookmarks || []).map(
        (bookmark) => bookmark.articleId
      );

      setBookmarkedIds(ids);
    } catch (error) {
      console.error(
        "Failed to load bookmarks:",
        error
      );
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
  const loadUserPreferences = async () => {
    try {
      const data = await getCurrentUser();

      const categories =
        data.user?.preferredCategories || [];

      setPreferredCategories(categories);

      // If user has preferences, load first category
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
        await loadNews(categories[0]);
      } else {
        await loadNews("All");
      }

      await loadBookmarks();
    } catch (error) {
      console.error(
        "Failed to load user preferences:",
        error
      );

      await loadNews("All");
      await loadBookmarks();
    }
  };

  loadUserPreferences();
}, []);

  // =========================
  // CATEGORY
  // =========================

  const handleCategory = (category) => {
    setActiveCategory(category);
    loadNews(category);
  };

  // =========================
  // BOOKMARK TOGGLE
  // =========================

  const toggleBookmark = async (article) => {
    try {
      const articleId = article.url;

      const isBookmarked =
        bookmarkedIds.includes(articleId);

      if (isBookmarked) {
        await removeBookmark(articleId);

        setBookmarkedIds((prev) =>
          prev.filter((id) => id !== articleId)
        );
      } else {
        await addBookmark(article);

        setBookmarkedIds((prev) => [
          ...prev,
          articleId,
        ]);
      }
    } catch (error) {
      console.error(
        "Bookmark action failed:",
        error
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // SEARCH
  // =========================

  const filteredNews = news.filter((article) =>
    article.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleReadArticle = async (article) => {
  try {
    await addHistory({
      articleId:
        article.url ||
        `${article.source?.name}-${article.title}`,

      title: article.title,

      description:
        article.description || "",

      url: article.url,

      urlToImage:
        article.urlToImage || "",

      source:
        article.source?.name || "Unknown Source",

      publishedAt:
        article.publishedAt || null,
    });
  } catch (error) {
    console.error(
      "Failed to add article to history:",
      error
    );
  }
};

  return (
    <div className="dashboard">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            <Newspaper size={24} />
          </div>

          <span>NewsHub</span>

        </div>

        <div className="navbar-actions">
          <button
  className="theme-toggle"
  onClick={toggleTheme}
  title={
    theme === "light"
      ? "Switch to dark mode"
      : "Switch to light mode"
  }
>
  {theme === "light" ? (
    <Moon size={20} />
  ) : (
    <Sun size={20} />
  )}
</button>

          <button
            className="icon-button"
            title="Bookmarks"
            onClick={() => navigate("/bookmarks")}
          >
            <Bookmark size={20} />
          </button>

          <button
            className="icon-button"
            title="History"
            onClick={() => navigate("/history")}
          >
            <Clock3 size={20} />
          </button>

          <button
            className="icon-button"
            title="Analytics"
            onClick={() => navigate("/analytics")}
          >
            <BarChart3 size={20} />
          </button>

          <button
  className="user-info"
  onClick={() => navigate("/profile")}
  title="Profile"
>
  <User size={18} />
  <span>{user?.name || "User"}</span>
</button>

          <button
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>

        </div>

      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="dashboard-hero">

        <div>

          <p className="welcome-text">
            Welcome back,{" "}
            {user?.name || "Reader"} 👋
          </p>

          <h1>
            Stay informed.
            <br />
            Stay ahead.
          </h1>

          <p className="hero-description">
            Discover the latest news from around
            the world, personalized for you.
          </p>

        </div>

      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="news-controls">

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </section>

      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="category-bar">

        {categories.map((category) => (

          <button
            key={category}
            className={
              activeCategory === category
                ? "category-button active"
                : "category-button"
            }
            onClick={() =>
              handleCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </section>

      {/* =========================
          NEWS
      ========================= */}

      <main className="news-container">

        <div className="section-heading">

          <div>

            <h2>
              {activeCategory === "All"
                ? "Latest News"
                : `${activeCategory} News`}
            </h2>

            <p>
              {filteredNews.length} articles found
            </p>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="loading">

            <div className="loader"></div>

            <p>
              Loading latest news...
            </p>

          </div>

        )}

        {/* ERROR */}

        {error && (

          <div className="error-message">
            {error}
          </div>

        )}

        {/* NEWS GRID */}

        {!loading && !error && (

          <div className="news-grid">

            {filteredNews.map(
              (article, index) => {

                const isBookmarked =
                  bookmarkedIds.includes(
                    article.url
                  );

                return (

                  <article
                    className="news-card"
                    key={`${article.url}-${index}`}
                  >

                    {/* IMAGE */}

                    {article.urlToImage ? (

                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="news-image"
                      />

                    ) : (

                      <div className="news-image placeholder">

                        <Newspaper size={40} />

                      </div>

                    )}

                    {/* CONTENT */}

                    <div className="news-content">

                      {/* META */}

                      <div className="news-meta">

                        <span>
                          {article.source?.name ||
                            "Unknown Source"}
                        </span>

                        <span>
                          {article.publishedAt
                            ? new Date(
                                article.publishedAt
                              ).toLocaleDateString()
                            : ""}
                        </span>

                      </div>

                      {/* TITLE */}

                      <h3>
                        {article.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p>
                        {article.description ||
                          "No description available."}
                      </p>

                      {/* ACTIONS */}

                      <div className="news-actions">

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="read-button"
                          onClick={() => handleReadArticle(article)}
                        >
                          Read Article →
                        </a>

                        {/* BOOKMARK */}

                        <button
                          className={
                            isBookmarked
                              ? "save-button bookmarked"
                              : "save-button"
                          }
                          title={
                            isBookmarked
                              ? "Remove bookmark"
                              : "Bookmark"
                          }
                          onClick={() =>
                            toggleBookmark(article)
                          }
                        >

                          <Bookmark
                            size={18}
                            fill={
                              isBookmarked
                                ? "currentColor"
                                : "none"
                            }
                          />

                        </button>

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        )}

        {/* EMPTY STATE */}

        {!loading &&
          !error &&
          filteredNews.length === 0 && (

            <div className="empty-state">

              <Newspaper size={48} />

              <h3>
                No news found
              </h3>

              <p>
                Try another search or category.
              </p>

            </div>

          )}

      </main>

    </div>
  );
}

export default Dashboard;