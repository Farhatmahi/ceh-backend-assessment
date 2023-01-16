const mongoose = require("mongoose");

const newClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company_name: {
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
  email: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
  deadline_after_monday: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
  },
  hear_about_us: {
    type: String,
    required: true,
  },
});

const NewClient = mongoose.model("NewClient", newClientSchema);
module.exports = NewClient;
