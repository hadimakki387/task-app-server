const router = require("express").Router();

const {
  getTasks,
  addTask,
  removeTask,
  setTaskDone,
  editTask,
} = require("../controller/tasksController");
const { signUp, signIn, checkAuth } = require("../controller/usersController");

// Get all tasks
router.get("/home", getTasks);

// Add a task
router.post("/add-task", addTask);

// Remove a task
router.post("/remove-task", removeTask);

// Check task done
router.post("/check-done-task", setTaskDone);

// Edit a task
router.post("/edit-task", editTask);

// Register User
router.post("/sign-up", signUp);

// Register User
router.post("/sign-in", signIn);

router.get("/auth",checkAuth)

module.exports = router;
