import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  tweet: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },

  author: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  likes: [String],
});

export default mongoose.model("Post", postSchema);
