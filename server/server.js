import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/history", historyRoutes);


// MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "News Aggregator API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});