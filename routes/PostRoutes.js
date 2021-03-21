import express from "express";
import {
  getAllPosts,
  getPostById,
  getDetailPostView,
  addNewPost,
  LikePost,
  DeletePost,
  UpdatePost,
} from "../controllers/PostController.js";
const PostRoutes = express.Router();

PostRoutes.get("/", getAllPosts);
PostRoutes.get("/:id", getPostById);
PostRoutes.get("/:id/detail", getDetailPostView);
PostRoutes.post("/", addNewPost);
PostRoutes.post("/like/:post_id", LikePost);
PostRoutes.post("/delete/:post_id", DeletePost);
PostRoutes.post("/update/:post_id", UpdatePost);

export default PostRoutes;
