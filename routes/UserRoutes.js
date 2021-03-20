import express from "express";
import authenticate from "../middlewares/Authenticate.js";
import {
  RegisterUser,
  LoginUser,
  getAllUser,
  FollowUser,
  UnFollowUser,
  getSingleUser,
} from "../controllers/UserController.js";

import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./profileImages"),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e8
    )}${path.extname(file.originalname)}`;

    cb(null, fileName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
});
const UserRoutes = express.Router();

UserRoutes.get("/all", authenticate, getAllUser);
UserRoutes.get("/:id", authenticate, getSingleUser);
UserRoutes.post("/register", upload.single("profileImage"), RegisterUser);
UserRoutes.post("/login", LoginUser);
UserRoutes.post("/follow/:following_id", authenticate, FollowUser);
UserRoutes.post("/unfollow/:following_id", authenticate, UnFollowUser);
export default UserRoutes;
