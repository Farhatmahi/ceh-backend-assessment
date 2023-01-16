const asyncHandler = require("express-async-handler");
const PostJob = require("../Models/postJobModel");

const postJob = asyncHandler(async (req, res) => {
  try {
    const jobType = req.query.job_type;
    const {
      category,
      image,
      company_name,
      company_details,
      responsibility,
      salary,
    } = req.body;

    if (
      !category ||
      !image ||
      !company_name ||
      !company_details ||
      !responsibility ||
      !salary
    ) {
      res.send(400).send({ message: "Please enter all the fields" });
    }

    const job = await PostJob.create({
      job_type: jobType,
      category,
      image,
      company_name,
      company_details,
      responsibility,
      salary,
    });

    await job.save();

    res.status(200).json({ success: true, job });
  } catch (error) {}
});

module.exports = { postJob };
