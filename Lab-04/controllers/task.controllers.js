const Task = require("../dataModels/Task.model");
const {
  uploadProfileImage,
  uploadAudioFile,
} = require("../middlewares/image.middleware");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  const newTask = new Task({
    name,
    description,
    user_id: userId,
  });

  try {
    uploadProfileImage.array("images", 5)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }

      uploadAudioFile.single("audio")(req, res, async (audioErr) => {
        if (audioErr) {
          return res.status(400).json({ error: "Audio upload failed" });
        }

        try {
          if (req.files && req.files.length > 0) {
            newTask.images = req.files.map((file) => file.filename);
          }

          if (req.file) {
            newTask.audio = req.file.filename;
          }

          await newTask.save();
          res.status(200).json({ message: "Task created" });
        } catch (saveError) {
          res.status(400).json({ error: "Failed to create the task" });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error: "Please try again" });
  }
};

const updateTask = async (req, res) => {
  try {
    const name = req.params.name;
    const description = req.body.description;
    const images = req.files ? req.files.map((file) => file.filename) : [];
    const audio = req.file ? req.file.filename : "";

    const task = await Task.findOne({ name });

    if (task) {
      if (description) {
        task.description = description;
      }

      if (images.length > 0) {
        task.images = task.images.concat(images);
      }

      if (audio) {
        task.audio = audio;
      }

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
  updateTask,
};
