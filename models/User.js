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
  avatar: {
    type: String,
    default:
      "//www.gravatar.com/avatar/e2dad77d2b542486f4435bade75c1739?s=200&r=pg&d=mm",
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
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});
module.exports = User = mongoose.model("user", UserSchema);
