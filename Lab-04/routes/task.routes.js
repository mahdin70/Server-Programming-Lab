const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
  getProfilesTask,
  updateTask,
} = require("../controllers/task.controllers");

router.get('/tasks', getTasks)
router.post('/createtask', createTask);
router.delete('/deletetask/:name', deleteTask);
router.get('/getProfilestask', getProfilesTask);
router.patch("/updatetask/:name/:description", updateTask);

module.exports = router;
