const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

//middleware
app.use(express.json());

//jwt middleware
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

app.get("/", async (req, res) => {
  res.send("Server is running");
});

const uri = `mongodb+srv://farhatmahi:Farhat007@cluster0.6ulnnbw.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const usersCollection = client.db("CEH").collection("users");
    const projectsCollection = client.db("CEH").collection("projects");
    const reportsCollection = client.db("CEH").collection("reports");

    //registration api
    app.post("/registration", async (req, res) => {
      const { username, email, password, profilePicture, role } = req.body;

      const existingUser = await usersCollection.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        username,
        email,
        password: hashedPassword,
        profilePicture,
        role,
      };

      const result = await usersCollection.insertOne(user);
      //   console.log(result);
      if (result.acknowledged) {
        const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
        res.send({ token });
      }
    });

    //login api
    app.post("/login", async (req, res) => {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username: username });

      if (!user) {
        res.status(401).send({ message: "Invalid credentials" });
      }

      if (bcrypt.compareSync(password, user?.password)) {
        const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
        res.send({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });

    //add project
    app.post("/add-project", verifyJWT, async (req, res) => {
      const project = req.body;
      const findClient = await usersCollection.findOne({
        username: project?.client_username,
      });

      if (findClient) {
        const result = await projectsCollection.insertOne(project);
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Client not found" });
      }
    });

    //add report
    app.post("/add-report/:id", verifyJWT, async (req, res) => {
      const projectId = req.params.id;
      const project = await projectsCollection.findOne({
        _id: ObjectId(projectId),
      });

      if (!project) {
        return res.status(404).send({ message: "Project not found" });
      }

      const newReport = req.body;

      if (newReport.week === "" || newReport.report_link === "") {
        return res.status(400).send({ message: "Please enter week and report" });
      } else {
        const result = await reportsCollection.insertOne(newReport);
        res.status(200).send(result);
      }
    });

    //add feedback
    app.put("/add-feedback/:id", async (req, res) => {
      const projectId = req.params.id;
      const project = await projectsCollection.findOne({
        _id: ObjectId(projectId),
      });

      if (!project) {
        return res.status(404).send({ message: "Project not found" });
      }

      if(project.feedback){
        return res.send({message : "Feedback already added"})
      }

      const newFeedback = req.body;

      if (!newFeedback.stars === "undefined") {
        return res.status(400).send({ message: "Please leave stars" });
      }

      const updatedDoc = {
        $set: {
          feedback: newFeedback,
        },
      };


      const result = await projectsCollection.updateOne(project, updatedDoc, {
        upsert: true,
      });
      res.send(result);

    });




  } catch (error) {
    res.status(400);
  }
};

run().catch((err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
