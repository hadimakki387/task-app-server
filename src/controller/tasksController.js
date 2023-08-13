const Task = require("../models/TaskSchema");

const getTasks = async (req, res) => {
  console.log(req.query);
};

const addTask = async (req, res) => {
  console.log(req.body)
};

module.exports = { getTasks, addTask };