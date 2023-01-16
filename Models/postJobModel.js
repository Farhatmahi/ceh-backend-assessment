const mongoose = require("mongoose");

const postJobModelSchema = mongoose.Schema(
  {
    job_type : {type : String, required : true},
    category : {type : String, required : true},
    image : {type : String, required : true},
    company_name : {type : String, required : true},
    company_details : {type : String, required : true},
    responsibility : {type : String, required : true},
    salary : {type : String, required : true},
    
  },
  {
    timestamps: true,
  }
);


const PostJob = mongoose.model("PostJob", postJobModelSchema);
module.exports = PostJob;
