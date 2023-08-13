const Task = require("../models/TaskSchema");

const getTasks = async (req, res) => {
  console.log(req.query);
};

const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({ message: "Task added" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getTasks, addTask };