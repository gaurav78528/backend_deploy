const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  description: String,
  user: String,
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };