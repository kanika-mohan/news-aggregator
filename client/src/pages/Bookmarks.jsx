import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  Newspaper,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getBookmarks,
  removeBookmark,
} from "../services/api";

function Bookmarks() {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBookmarks();

      setBookmarks(data.bookmarks || []);
    } catch (error) {
      console.error("Failed to load bookmarks:", error);

      setError(
        "Unable to load your bookmarks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const handleRemove = async (articleId) => {
    try {
      await removeBookmark(articleId);

      setBookmarks((prev) =>
        prev.filter(
          (bookmark) =>
            bookmark.articleId !== articleId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove bookmark:",
        error
      );
    }
  };

  return (
    <div className="bookmarks-page">

      {/* Header */}

      <header className="bookmarks-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          Back to News
        </button>

        <div className="bookmarks-title">

          <Bookmark size={28} />

          <div>
            <h1>My Bookmarks</h1>

            <p>
              {bookmarks.length} saved{" "}
              {bookmarks.length === 1
                ? "article"
                : "articles"}
            </p>
          </div>

        </div>

      </header>

      {/* Content */}

      <main className="bookmarks-container">

        {loading && (
          <div className="loading">
            <div className="loader"></div>

            <p>
              Loading your bookmarks...
            </p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          bookmarks.length === 0 && (

            <div className="empty-state">

              <Bookmark size={52} />

              <h2>
                No bookmarks yet
              </h2>

              <p>
                Save interesting articles and
                they'll appear here.
              </p>

              <button
                className="read-button"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Explore News
              </button>

            </div>

          )}

        {!loading &&
          !error &&
          bookmarks.length > 0 && (

            <div className="bookmarks-grid">

              {bookmarks.map((bookmark) => (

                <article
                  className="bookmark-card"
                  key={bookmark._id}
                >

                  {/* Image */}

                  {bookmark.urlToImage ? (

                    <img
                      src={bookmark.urlToImage}
                      alt={bookmark.title}
                      className="bookmark-image"
                    />

                  ) : (

                    <div className="bookmark-image placeholder">
                      <Newspaper size={40} />
                    </div>

                  )}

                  {/* Content */}

                  <div className="bookmark-content">

                    <div className="bookmark-meta">

                      <span>
                        {bookmark.source ||
                          "Unknown Source"}
                      </span>

                      <span>
                        {bookmark.publishedAt
                          ? new Date(
                              bookmark.publishedAt
                            ).toLocaleDateString()
                          : ""}
                      </span>

                    </div>

                    <h2>
                      {bookmark.title}
                    </h2>

                    <p>
                      {bookmark.description ||
                        "No description available."}
                    </p>

                    <div className="bookmark-actions">

                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-button"
                      >
                        Read Article
                        <ExternalLink
                          size={16}
                        />
                      </a>

                      <button
                        className="delete-bookmark"
                        title="Remove bookmark"
                        onClick={() =>
                          handleRemove(
                            bookmark.articleId
                          )
                        }
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default Bookmarks;