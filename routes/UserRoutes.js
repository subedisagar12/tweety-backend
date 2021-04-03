import express from "express";
import authenticate from "../middlewares/Authenticate.js";
import {
  RegisterUser,
  LoginUser,
  getAllUser,
  FollowUser,
  UnFollowUser,
  getSingleUser,
  updateUserInfo,
  getAllFollowers,
  getAllFollowing,
  getMutualFollowers,
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
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      cb(null, false);
      return cb(new Error("Only Jpeg and png file supported"));
    } else {
      cb(null, true);
    }
  },
  limits: { fileSize: 1000000 * 100 },
});
const UserRoutes = express.Router();

UserRoutes.get("/all", authenticate, getAllUser);
UserRoutes.get("/:id", authenticate, getSingleUser);
UserRoutes.post("/register", upload.single("profileImage"), RegisterUser);
UserRoutes.post("/login", LoginUser);
UserRoutes.post(
  "/update/:id",
  [authenticate, upload.single("profileImage")],
  updateUserInfo
);
UserRoutes.post("/follow/:following_id", authenticate, FollowUser);
UserRoutes.post("/unfollow/:following_id", authenticate, UnFollowUser);
UserRoutes.get("/:user_id/followers", authenticate, getAllFollowers);
UserRoutes.get("/:user_id/following", authenticate, getAllFollowing);
UserRoutes.get(
  "/mutualfollower/:loggedUserId/:userId",
  authenticate,
  getMutualFollowers
);
export default UserRoutes;
