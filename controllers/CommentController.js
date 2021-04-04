import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";
const sortByDate = (arr) => {
  const sorter = (a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  };
  arr.sort(sorter);
};
export const getCommentOnPost = async (req, res) => {
  try {
    let comments = await Comment.find({ post: req.params.post_id });

    sortByDate(comments);
    // console.log(comments);
    return res.send({ data: comments, success: "Fetched Comments", error: "" });
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const postCommentOnPost = async (req, res) => {
  try {
    let comment = await new Comment({
      comment: req.body.comment,
      commented_by: req.headers["auth-user-id"],
      post: req.params.post_id,
    });

    if (comment) {
      let data = await comment.save();
      return res.send({
        data: data,
        success: "Comment has been posted",
        error: "",
      });
    } else {
      return res.send({
        data: {},
        success: "",
        error: "Error occured while posting comment",
      });
    }
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};
