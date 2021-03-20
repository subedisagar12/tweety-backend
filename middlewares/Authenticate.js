import User from "../models/UserModel.js";

const authenticate = async (req, res, next) => {
  try {
    const user_id = await req.header("auth-user-id");
    if (!user_id) {
      return res
        .status(403)
        .send({ data: {}, success: "", error: "Unauthorized access" });
    }
    let user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.send({
        data: {},
        success: "",
        error: "Invalid user id sent on header",
      });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export default authenticate;
