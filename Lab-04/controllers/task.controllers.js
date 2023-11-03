const Task = require("../dataModels/Task.model");
const path = require("path");

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
  const { name, description, userId } = req.body;
  const newTask = new Task({
    name: name,
    description: description,
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


const getProfilesTask = async (req, res) => {
  try {
    const TaskName = req.body.name;
    const tasks = await Task.find({ name: TaskName }).select("user_id");
    if (tasks.length > 0) {
      const Users = [];
      for (const task of tasks) {
        const user = await User.findById(task.user_id);
        if (user) {
          Users.push(user);
          console.log(user);
        }
      }
      if (Users.length === 0) {
        res.json({ message: "No user found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const name = req.params.name;
    const description = req.params.description;
    const task = await Task.findOne({ name: name });
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
  getProfilesTask,
  updateTask,
};
