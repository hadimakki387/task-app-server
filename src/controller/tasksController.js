const Task = require("../models/TaskSchema");

const getTasks = async (req, res) => {
  console.log(req.query)
  try {
    let tasks
    if(req.query.cat === "All"){
      tasks = await Task.find({taskOwner:req.query.userID});
    }
    if(req.query.cat === "notDone"){
      tasks = await Task.find({isDone:false,taskOwner:req.query.userID});
      console.log(tasks)
    }
    if(req.query.cat === "Done"){
      tasks = await Task.find({isDone:true,taskOwner:req.query.userID});
    }

    
 
    const { page, limit } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedTasks = tasks.slice(startIndex, endIndex);
    
    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({ paginatedTasks, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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

const removeTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const id = taskId.id
    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }
    await Task.findByIdAndRemove(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getTasks, addTask ,removeTask};