import express from "express";
import { getTopHeadlines } from "../controllers/newsController.js";

const router = express.Router();

router.get("/headlines", getTopHeadlines);

export default router;