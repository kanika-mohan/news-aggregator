
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bookmarks from "./pages/Bookmarks";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* =========================
            REGISTER
        ========================= */}

        <Route
          path="/register"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            BOOKMARKS
        ========================= */}

        <Route
          path="/bookmarks"
          element={
            localStorage.getItem("token") ? (
              <Bookmarks />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            HISTORY
        ========================= */}

        <Route
          path="/history"
          element={
            localStorage.getItem("token") ? (
              <History />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={
            localStorage.getItem("token") ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            ANALYTICS
        ========================= */}

        <Route
          path="/analytics"
          element={
            localStorage.getItem("token") ? (
              <Analytics />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* =========================
            UNKNOWN ROUTE
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

