const router = require("express").Router();

const {
  getTasks,
  addTask,

} = require("../controller/tasksController");


// Get all tasks
router.get("/home", getTasks);

// Add a task
router.post("/add-task", addTask);



module.exports = router;
