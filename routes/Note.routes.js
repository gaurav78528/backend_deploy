const express = require("express");
const { NoteModel } = require("../model/Note.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  // res.send("All notes will shown here");

  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (error) {
    res.send("Failed to get Notes");
    console.log("Failed to get Notes");
    console.log(error);
  }
});
noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "Note has been Created." });
  } catch (error) {
    res.send({ msg: "Failed to create Note." });
    console.log("Failed to create Note.");
    console.log(error);
  }
});
noteRouter.patch("/update/:id", async (req, res) => {
  // res.send("Notes update");
  const payload = req.body;
  const ID = req.params.id;
  const note = await NoteModel.findOne({ _id: ID });
  // console.log({note});
  const userID_in_note = note.user;
  const userID_making_req = req.body.user;
  console.log({ userID_making_req: userID_making_req });
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send(`Note With Id: ${ID} has been Updated.`);
    }
  } catch (error) {
    res.send("failed to update note");
    console.log("failed to update note.");
    console.log(error);
  }
});

// 63f13013fa6b633eed056316

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2YxMzg3OTM3NTI4Nzk0NWNmZTdkMzEiLCJpYXQiOjE2NzY3NTMwMzN9.mbbVJD-xuGR-8Ge40FCC3Vz-ZbJEdAp4ez9l9CZOTJ8
noteRouter.delete("/delete/:id", async (req, res) => {
  // res.send("Notes deleted");
  const ID = req.params.id;
  const note = await NoteModel.findOne({ _id: ID });
  // console.log(note.user);
  const userID_in_note = note.user;
  const userID_making_req = req.body.user;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: `Note With Id: ${ID} has been Deleted.` });
    }
  } catch (error) {
    res.send({ msg: "failed to delete note" });
    console.log("failed to delete note.");
    console.log(error);
  }
});

// learing backend things for the first time

module.exports = { noteRouter };
