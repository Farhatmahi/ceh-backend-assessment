const asyncHandler = require("express-async-handler");
const Course = require("../Models/newStudentModel");
const generateProspectId = require("../Config/generateProspectId");

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

    const course = new Course({
      name,
      guardian_name,
      phone_number,
      address,
      learning_interest,
      future_goals,
      hear_about_us,
      prospectId,
    });

    await course.save();

    res.status(201).json({ success: true, prospectId });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = { newStudentForm };
