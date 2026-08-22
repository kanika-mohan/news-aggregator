import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    articleId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
    },

    urlToImage: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

bookmarkSchema.index(
  { user: 1, articleId: 1 },
  { unique: true }
);

const Bookmark = mongoose.model(
  "Bookmark",
  bookmarkSchema
);

export default Bookmark;