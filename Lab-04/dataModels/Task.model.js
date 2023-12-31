const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  user_id: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  audio: {
    type: String,
    default: "",
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
