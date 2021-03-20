import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find();

    return res.send({
      data: posts,
      success: "Fetched Success",
      error: "",
    });
  } catch (e) {
    return res.send({
      data: {},
      success: "",
      error: e.message,
    });
  }
};

export const getPostById = (req, res) => {
  return res.send(req.params.id);
};

export const getDetailPostView = (req, res) => {
  return res.send(req.params.id);
};

export const addNewPost = async (req, res) => {
  try {
    let newPost = new Post({
      tweet: req.body.tweet,
      author: req.headers["auth-user-id"],
    });

    let data = await newPost.save();
    if (!data) {
      return res.send({
        data: {},
        success: "",
        error: "Error occured while tweeting. Please try again later.",
      });
    }

    return res.send({
      data: data,
      success: "Your tweet has been successfully posted",
      error: "",
    });
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const LikePost = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    // console.log(post);
    if (post.likes.includes(req.headers["auth-user-id"])) {
      let data = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        {
          $pull: {
            likes: req.headers["auth-user-id"],
          },
        }
      );
      return res.send({ data: data, success: "Success", error: "" });
    } else {
      let data = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        {
          $addToSet: {
            likes: req.headers["auth-user-id"],
          },
        }
      );
      return res.send({ data: data, success: "Success", error: "" });
    }
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const AddComment = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.post_id });
    if (post) {
      let data = await Post.findOneAndUpdate(
        { _id: req.params.post_id },
        {
          $addToSet: {
            comments: {
              commented_by: req.headers["auth-user-id"],
              comment: req.body.comment,
            },
          },
        }
      );
      return res.send({
        data: data,
        success: "Your comment has been posted",
        error: "",
      });
    } else {
      return res.send({ data: {}, success: "", error: "Post not found" });
    }
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};
