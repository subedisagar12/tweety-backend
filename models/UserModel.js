import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  gender: {
    type: String,
    required: true,
  },
  followers: [String],
  following: [String],
  profileImage: {
    type: String,
    required: false,
  },
});

export default mongoose.model("User", userSchema);
