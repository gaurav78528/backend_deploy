const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { noteRouter } = require("./routes/Note.routes");
const { userRouter } = require("./routes/User.routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/users", userRouter);

app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Failed to connect to the database.");
  }
  console.log(`Server Running on Port ${port}`);
});