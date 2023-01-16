const mongoose = require("mongoose");

const newStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  guardian_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  learning_interest: {
    type: String,
    required: true,
  },
  future_goals: {
    type: String,
    required: true,
  },
  hear_about_us: {
    type: String,
    required: true,
  },
});

const NewStudent = mongoose.model("NewStudent", newStudentSchema);
module.exports = NewStudent;
