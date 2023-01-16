const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userRoute = require('./Routes/userRoute');
const newStudentRoute = require('./Routes/newStudentRoute')

//middleware
app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});


mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectDB().catch(err => console.log(err))

app.use('/user', userRoute)
app.use('/new-student', newStudentRoute)