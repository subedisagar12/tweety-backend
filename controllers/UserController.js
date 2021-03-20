import User from "../models/UserModel.js";
import hashPassword from "password-hash";

// Function to validate Email
const validateEmail = (emailToBeValidated) => {
  //   let regex = /[a-zA-Z]+[a-zA-z0-9]{4,}[@][a-zA-Z]{2,}[.][a-zA-Z]{2,}/;
  //   let res = regex.match(emailToBeValidated);
  //   console.log(res);
  if (emailToBeValidated) {
    let atpos = emailToBeValidated.indexOf("@");
    let dotpos = emailToBeValidated.lastIndexOf(".");

    if (atpos < 2 || dotpos - atpos < 2) {
      return false;
    }
    return true;
  }
  return false;
};

// Controller to register user
export const RegisterUser = async (req, res) => {
  let duplicateUser = await User.find({ email: req.body.email });

  if (duplicateUser.length >= 1) {
    return res.send({ data: {}, success: "", error: "Email already in use" });
  }
  try {
    let validEmail = validateEmail(req.body.email);
    if (validEmail === false) {
      return res.send({ data: {}, success: "", error: "Invalid email" });
    }
    let hashedPassword = "";
    req.body.password.length >= 5
      ? (hashedPassword = hashPassword.generate(req.body.password))
      : null;

    let newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      profileImage: req.file ? req.file.path : "",
    });

    let data = await newUser.save();
    if (!data) {
      return res.json({
        data: {},
        success: "",
        error: "Error occured while registering user. Please try again",
      });
    }
    return res.json({
      data: data,
      success: "User is registered successfully",
      error: "",
    });
  } catch (e) {
    return res.json({ data: {}, success: "", error: e.message });
  }
};

export const LoginUser = async (req, res) => {
  let trying_to_login_user = await req.body;
  //   Validating email
  if (validateEmail(trying_to_login_user.email) === false) {
    return res.send({ data: {}, success: "", error: "Enter valid email" });
  }

  //   Checking is password of valid length is entered
  if (trying_to_login_user.password.length < 5) {
    if (trying_to_login_user.password.length === 0) {
      return res.send({
        data: {},
        success: "",
        error: "Please enter the password",
      });
    }
    return res.send({
      data: {},
      success: "",
      error: "Password length should be greater than 5",
    });
  }

  //   Checking if user exists

  try {
    let user = await User.findOne({ email: req.body.email });
    // checking if user is registered
    if (!user) {
      return res.send({
        data: {},
        success: "",
        error: "Email has not been registered",
      });
    }

    // Checking if password is correct
    if (!hashPassword.verify(req.body.password, user.password)) {
      return res.send({
        data: {},
        success: "",
        error: "Incorrect Credentials",
      });
    }
    return res
      .set("auth-user-id", user._id)
      .send({ data: user, success: "Login Success", error: "" });
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    let allUsers = await User.find();

    if (allUsers) {
      return res.send({
        data: allUsers,
        success: "Fetched Successfully",
        error: "",
      });
    }
    return res.send({ data: {}, success: "", error: "Server error" });
  } catch (e) {
    return res.send({ data: {}, success: "", error: e.message });
  }
};

export const FollowUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.headers["auth-user-id"], {
      $addToSet: {
        following: req.params.following_id,
      },
    });

    await User.findByIdAndUpdate(req.params.following_id, {
      $addToSet: {
        followers: req.headers["auth-user-id"],
      },
    });

    return res.send({ data: user, success: "Followed", error: "" });
  } catch (e) {
    console.log(e);
  }
};

export const UnFollowUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.headers["auth-user-id"] },
      {
        $pull: {
          following: req.params.following_id,
        },
      }
    );

    await User.findByIdAndUpdate(req.params.following_id, {
      $pull: {
        followers: req.headers["auth-user-id"],
      },
    });
    return res.send({ data: user, success: "Followed", error: "" });
  } catch (e) {
    console.log(e);
  }
};

export const getSingleUser=async(req,res)=>{
  try{
  let user=await User.findOne({_id:req.params.id})
  if(user){
    return res.send({ data: user, success: "User Fetched", error: "" });
  }
  return res.send({ data: {}, success: "", error: "User not found" });
  }catch(e){
    return res.send({ data: {}, success: "", error: e.message });
  }
}