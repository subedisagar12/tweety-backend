import express from "express";
import {
  getAllPosts,
  getPostById,
  getDetailPostView,
  addNewPost,
  LikePost,
  AddComment,
} from "../controllers/PostController.js";
const PostRoutes = express.Router();

PostRoutes.get("/", getAllPosts);
PostRoutes.get("/:id", getPostById);
PostRoutes.get("/:id/detail", getDetailPostView);
PostRoutes.post("/", addNewPost);
PostRoutes.post("/like/:post_id", LikePost);

PostRoutes.post("/comment/:post_id", AddComment);
export default PostRoutes;
