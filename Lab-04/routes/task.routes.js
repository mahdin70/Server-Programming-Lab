const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controllers");

router.get('/tasks', getTasks);
router.post('/createtask', createTask);
router.delete('/deletetask/:name', deleteTask);
router.patch("/updatetask/:name", updateTask);

module.exports = router;
