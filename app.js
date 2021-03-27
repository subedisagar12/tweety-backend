import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
let PORT = process.env.PORT || "5000";

app.use(express.json());
app.use(cors());

// Routes import
import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";

// Middlewares import
import authenticate from "./middlewares/Authenticate.js";

// User Routes
app.options("*", cors());
app.use("/profileImages", express.static("profileImages"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/tweety/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "tweety", "build", "index.html")
    );
  });
}
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
