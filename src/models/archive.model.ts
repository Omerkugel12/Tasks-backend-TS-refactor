const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

const archiveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  todoList: [todoSchema],
  isPinned: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Archive = mongoose.model("Archive", archiveSchema);
module.exports = Archive;
