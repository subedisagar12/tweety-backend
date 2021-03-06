import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
let PORT = process.env.PORT || "5000";
let __dirname = path.resolve();
app.use(express.json());

// Routes import
import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";

// Middlewares import
import authenticate from "./middlewares/Authenticate.js";

// User Routes
// app.options("*", cors());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("./profileImages"));
// }
app.use("/profileImages", express.static(__dirname + `/profileImages`));
app.use("/user", UserRoutes);
app.use("/post", authenticate, PostRoutes);
app.use("/comment", authenticate, CommentRoutes);

mongoose.connect(process.env.DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
let conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connected to database");
});

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
