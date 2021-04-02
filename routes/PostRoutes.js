import express from "express";
import {
  getAllPosts,
  getPostById,
  getDetailPostView,
  addNewPost,
  LikePost,
  DeletePost,
  UpdatePost,
  GetAllPostOfUser,
} from "../controllers/PostController.js";
const PostRoutes = express.Router();

PostRoutes.get("/", getAllPosts);
PostRoutes.get("/:id", getPostById);
PostRoutes.get("/:id/detail", getDetailPostView);
PostRoutes.post("/", addNewPost);
PostRoutes.post("/like/:post_id", LikePost);
PostRoutes.post("/delete/:post_id", DeletePost);
PostRoutes.post("/update/:post_id", UpdatePost);
PostRoutes.get("/posts/:user_id", GetAllPostOfUser);

export default PostRoutes;
