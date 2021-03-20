import express from "express";
import {
  getCommentOnPost,
  postCommentOnPost,
} from "../controllers/CommentController.js";
const CommentRoutes = express.Router();

CommentRoutes.get("/:post_id", getCommentOnPost);
CommentRoutes.post("/:post_id", postCommentOnPost);

export default CommentRoutes;
