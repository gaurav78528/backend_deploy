const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  const { name, email, password } = payload;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ msg: "Something went wrong.", error: err.message });
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.json({
          message: "user has been registered",
        });
        // res.send("user has been registered");
      }
    });
  } catch (error) {
    console.log("Failed to regsiter user.");
    console.log(error);
    res.send("Failed to regsiter user.");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "logged in", token: token });
        } else {
          res.send({ msg: "Something Went Wrong.", err: err });
        }
      });
    } else {
      res.send("wrong credentials");
    }
  } catch (error) {
    console.log("Failed to login user.");
    console.log(error);
    res.send("Failed to login user.");
  }
});

// userRouter.delete("/delete/:id", async (req, res) => {
//   // res.send("Notes deleted");
//   const ID = req.params.id;
//   try {
//     await UserModel.findByIdAndDelete({ _id: ID });
//     res.send(`user With Id: ${ID} has been Deleted.`);
//   } catch (error) {
//     res.send("failed to delete user");
//     console.log("failed to delete note.");
//     console.log(error);
//   }
// });

module.exports = { userRouter };