const router = require("express").Router();

const {
  getTasks,
  addTask,
  removeTask,
  setTaskDone,
} = require("../controller/tasksController");

// Get all tasks
router.get("/home", getTasks);

// Add a task
router.post("/add-task", addTask);

// Remove a task
router.post("/remove-task", removeTask);

// Check task done
router.post("/check-done-task", setTaskDone);

module.exports = router;
