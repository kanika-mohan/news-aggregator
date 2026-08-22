import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  Newspaper,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getHistory,
  removeHistory,
  clearHistory,
} from "../services/api";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHistory();

      setHistory(data.history || []);
    } catch (error) {
      console.error(
        "Failed to load history:",
        error
      );

      setError(
        "Unable to load your history. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleRemove = async (articleId) => {
    try {
      await removeHistory(articleId);

      setHistory((prev) =>
        prev.filter(
          (item) =>
            item.articleId !== articleId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove history:",
        error
      );
    }
  };

  const handleClearHistory = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear your entire history?"
      )
    ) {
      return;
    }

    try {
      await clearHistory();

      setHistory([]);
    } catch (error) {
      console.error(
        "Failed to clear history:",
        error
      );
    }
  };

  return (
    <div className="history-page">

      {/* Header */}

      <header className="history-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          Back to News
        </button>

        <div className="history-title">

          <Clock3 size={28} />

          <div>
            <h1>Reading History</h1>

            <p>
              {history.length}{" "}
              {history.length === 1
                ? "article"
                : "articles"}{" "}
              viewed
            </p>
          </div>

        </div>

        {history.length > 0 && (
          <button
            className="clear-history-button"
            onClick={handleClearHistory}
          >
            <Trash2 size={17} />
            Clear History
          </button>
        )}

      </header>

      {/* Content */}

      <main className="history-container">

        {loading && (
          <div className="loading">
            <div className="loader"></div>

            <p>
              Loading your reading history...
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
          history.length === 0 && (

            <div className="empty-state">

              <Clock3 size={52} />

              <h2>
                No reading history
              </h2>

              <p>
                Articles you read will appear here.
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
          history.length > 0 && (

            <div className="history-grid">

              {history.map((item) => (

                <article
                  className="history-card"
                  key={item._id}
                >

                  {/* Image */}

                  {item.urlToImage ? (

                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="history-image"
                    />

                  ) : (

                    <div className="history-image placeholder">
                      <Newspaper size={40} />
                    </div>

                  )}

                  {/* Content */}

                  <div className="history-content">

                    <div className="history-meta">

                      <span>
                        {item.source ||
                          "Unknown Source"}
                      </span>

                      <span>
                        Viewed{" "}
                        {item.viewedAt
                          ? new Date(
                              item.viewedAt
                            ).toLocaleString()
                          : ""}
                      </span>

                    </div>

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      {item.description ||
                        "No description available."}
                    </p>

                    <div className="history-actions">

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-button"
                      >
                        Read Again
                        <ExternalLink
                          size={16}
                        />
                      </a>

                      <button
                        className="delete-history"
                        title="Remove from history"
                        onClick={() =>
                          handleRemove(
                            item.articleId
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

export default History;