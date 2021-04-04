import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commented_by: {
    type: String,
  },
  post: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Comment", CommentSchema);
