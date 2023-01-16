const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require('./Routes/userRoute');
const newStudentRoute = require('./Routes/newStudentRoute')
const newClientRoute = require('./Routes/newClientRoute')

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
app.use('/new-client', newClientRoute)