const Task = require("../dataModels/Task.model");

const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user_id: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id; // Assuming you get the user ID from authentication

  const newTask = new Task({
    name,
    description,
    user_id: userId,
  });

  try {
    await newTask.save();
    res.status(200).json({ message: "Task created" });
  } catch (error) {
    res.status(400).json({ error: "Please try again" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const TaskName = req.params.name;
    const deletedTask = await Task.findOneAndDelete({ name: TaskName });

    if (deletedTask) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(400).json({ error: "Task does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const name = req.params.name;
    const description = req.body.description;
    const task = await Task.findOne({ name });
    
    if (task) {
      task.description = description;
      await task.save();
      res.json({ message: "Task updated" });
    } else {
      res.json({ message: "No Task found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
