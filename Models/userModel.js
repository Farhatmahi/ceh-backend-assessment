const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String },
    prospect_id : {type : String}
  },
  {
    timestamps: true,
  }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, 10);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
