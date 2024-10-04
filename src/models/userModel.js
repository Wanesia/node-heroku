const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//pre-save middleware is a function that runs before a document is saved to the database
userSchema.pre("save", async function (next) {
  const user = this;

  //prevents rehashing when updating other fields like email or nickname
  if (!user.isModified("password")) {
    return next();
  }

  // Generate salt and hash the password
  try {
    console.log("in the try")
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
