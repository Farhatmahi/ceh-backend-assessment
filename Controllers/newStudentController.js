const asyncHandler = require("express-async-handler");
const NewStudent = require("../Models/newStudentModel");
const generateProspectId = require("../Config/generateProspectId");
const User = require("../Models/userModel");

const newStudentForm = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      guardian_name,
      phone_number,
      address,
      learning_interest,
      future_goals,
      hear_about_us,
    } = req.body;

    const { user } = req;

    if (!user) {
      return res
        .status(401)
        .send({ message: "You must be logged in to complete this action" });
    }

    if (
      !name ||
      !guardian_name ||
      !phone_number ||
      !address ||
      !learning_interest ||
      !future_goals ||
      !hear_about_us
    ) {
      return res.status(400).send({ message: "Please enter all fields" });
    }

    const prospectId = generateProspectId();

    const newStudent = new NewStudent({
      name,
      guardian_name,
      phone_number,
      address,
      learning_interest,
      future_goals,
      hear_about_us,
      prospectId,
    });

    await newStudent.save();

    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { prospect_id: prospectId } }
    );

    res.status(201).json({ success: true, prospectId, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = { newStudentForm };
