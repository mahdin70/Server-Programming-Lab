const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/auth.middleware");
const {
  getTasks,
  createTask,
  updateTask,
} = require("../controllers/task.controllers");

router.use(ensureAuthenticated);

router.get('/tasks', getTasks);
router.post('/createtask', createTask);
router.patch("/updatetask/:name", updateTask);
router.delete("/deletetask/:name");

module.exports = router;
