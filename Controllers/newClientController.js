const asyncHandler = require("express-async-handler");
const NewClient = require("../Models/newClientModel");
const generateProspectId = require("../Config/generateProspectId");
const User = require("../Models/userModel");

const newClientForm = asyncHandler(async (req, res) => {
  try {

    const {
      name,
      company_name,
      phone_number,
      address,
      requirement,
      deadline_after_monday,
      budget,
      email,
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
      !company_name ||
      !phone_number ||
      !address ||
      !requirement ||
      !deadline_after_monday ||
      !hear_about_us ||
      !email
    ) {
    
      return res.status(400).send({ message: "Please enter all fields" });
    }

    const prospectId = generateProspectId();
    const newClient = new NewClient({
      name,
      company_name,
      phone_number,
      address,
      requirement,
      deadline_after_monday,
      budget,
      email,
      hear_about_us,
      prospectId,
    });

    await newClient.save();

    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { prospect_id: prospectId } }
    );

    res.status(201).json({ success: true, prospectId, user });
  } catch (error) {}
});

module.exports = { newClientForm };
