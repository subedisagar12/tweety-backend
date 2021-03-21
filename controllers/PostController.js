import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import Comment from "../models/CommentModel.js";

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
    if (req.body.tweet.length > 500) {
      return res.send({
        data: {},
        success: "",
        error:
          "Tweet exceeded the word limit. Tweet can be of maximum 500 words",
      });
    }
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

export const DeletePost = async (req, res) => {
  try {
    let post = await Post.findOneAndDelete({ _id: req.params.post_id });

    Comment.deleteMany({ post: req.params.post_id })
      .then(() =>
        console.log(`Deleted all comments to the post ${req.params.post_id}`)
      )
      .catch((e) => console.log(e));
    return res.send({
      data: post,
      success: "Post has been deleted successfully.Refresh to view the change",
      error: "",
    });
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const UpdatePost = (req, res) => {};
