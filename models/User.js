const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  typeOfUser: {
    type: String,
    default: "yakra",
    enum: ["yakra", "ykhadem"],
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "admin"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});
module.exports = User = mongoose.model("user", UserSchema);


