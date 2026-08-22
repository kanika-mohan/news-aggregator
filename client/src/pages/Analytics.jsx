
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bookmark,
  Clock3,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import { getBookmarks, getHistory } from "../services/api";

function Analytics() {
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const [bookmarkData, historyData] = await Promise.all([
        getBookmarks(),
        getHistory(),
      ]);

      setBookmarks(bookmarkData?.bookmarks || []);
      setHistory(historyData?.history || []);
    } catch (error) {
      console.error("Analytics loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categoryStats = useMemo(() => {
    const stats = {};

    history.forEach((article) => {
      const category = article.category || "General";

      stats[category] = (stats[category] || 0) + 1;
    });

    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [history]);

  const mostReadCategory =
    categoryStats.length > 0
      ? categoryStats[0][0]
      : "No data";

  const maxCategoryCount =
    categoryStats.length > 0
      ? categoryStats[0][1]
      : 1;

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="loader"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-container">

        {/* Header */}

        <div className="analytics-header">
          <div>
            <div className="analytics-title-row">
              <div className="analytics-icon">
                <BarChart3 size={25} />
              </div>

              <h1>Analytics</h1>
            </div>

            <p>
              Understand your reading activity and news preferences.
            </p>
          </div>
        </div>

        {/* Statistics */}

        <div className="analytics-stats">

          <div className="analytics-stat-card">
            <div className="stat-icon">
              <Newspaper size={22} />
            </div>

            <div>
              <span>Total Articles Read</span>
              <strong>{history.length}</strong>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon">
              <Bookmark size={22} />
            </div>

            <div>
              <span>Total Bookmarks</span>
              <strong>{bookmarks.length}</strong>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>Reading History</span>
              <strong>{history.length}</strong>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon">
              <TrendingUp size={22} />
            </div>

            <div>
              <span>Top Category</span>
              <strong className="top-category">
                {mostReadCategory}
              </strong>
            </div>
          </div>

        </div>

        {/* Category Analysis */}

        <div className="analytics-grid">

          <section className="analytics-card">

            <div className="analytics-card-header">
              <div>
                <h2>Reading by Category</h2>
                <p>
                  Categories from your reading history
                </p>
              </div>

              <BarChart3 size={22} />
            </div>

            {categoryStats.length === 0 ? (
              <div className="analytics-empty">
                <Newspaper size={42} />
                <h3>No reading data yet</h3>
                <p>
                  Read some articles to see your category
                  statistics.
                </p>
              </div>
            ) : (
              <div className="category-chart">

                {categoryStats.map(([category, count]) => (
                  <div
                    className="category-stat"
                    key={category}
                  >
                    <div className="category-stat-info">
                      <span>{category}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.max(
                            (count / maxCategoryCount) * 100,
                            8
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </section>

          {/* Summary */}

          <section className="analytics-card">

            <div className="analytics-card-header">
              <div>
                <h2>Reading Summary</h2>
                <p>Your overall activity</p>
              </div>

              <TrendingUp size={22} />
            </div>

            <div className="summary-list">

              <div className="summary-item">
                <span>Articles read</span>
                <strong>{history.length}</strong>
              </div>

              <div className="summary-item">
                <span>Saved articles</span>
                <strong>{bookmarks.length}</strong>
              </div>

              <div className="summary-item">
                <span>Categories explored</span>
                <strong>{categoryStats.length}</strong>
              </div>

              <div className="summary-item">
                <span>Most read category</span>
                <strong>{mostReadCategory}</strong>
              </div>

            </div>

          </section>

        </div>

        {/* Recent Activity */}

        <section className="analytics-card recent-activity">

          <div className="analytics-card-header">
            <div>
              <h2>Recent Reading Activity</h2>
              <p>Your latest viewed articles</p>
            </div>

            <Clock3 size={22} />
          </div>

          {history.length === 0 ? (
            <div className="analytics-empty">
              <Clock3 size={42} />
              <h3>No activity yet</h3>
              <p>
                Start reading news to build your history.
              </p>
            </div>
          ) : (
            <div className="activity-list">

              {history.slice(0, 5).map((article, index) => (
                <div
                  className="activity-item"
                  key={
                    article._id ||
                    article.articleId ||
                    index
                  }
                >
                  <div className="activity-number">
                    {index + 1}
                  </div>

                  <div className="activity-content">
                    <h3>
                      {article.title ||
                        "Untitled article"}
                    </h3>

                    <p>
                      {article.source?.name ||
                        article.source ||
                        "News"}
                    </p>
                  </div>

                  {article.category && (
                    <span className="activity-category">
                      {article.category}
                    </span>
                  )}
                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default Analytics;
