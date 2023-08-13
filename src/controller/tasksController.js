const Task = require("../models/TaskSchema");
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  const claims = jwt.verify(req.query.userID, "hello");
  
  if(req.query.userID){
    try {
   
    let tasks
    if(req.query.cat === "All"){
      tasks = await Task.find({taskOwner:claims.id});
    }
    if(req.query.cat === "notDone"){
      tasks = await Task.find({isDone:false,taskOwner:claims.id});
      console.log(tasks)
    }
    if(req.query.cat === "Done"){
      tasks = await Task.find({isDone:true,taskOwner:claims.id});
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
  }else{
    res.status(404).json({ error: "unauthorized" });
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
const setTaskDone = async (req, res) => {
  try {
    await Task.findOneAndUpdate({ _id: req.body.id }, { isDone: true });
    res.json({ message: "Task Done" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
const editTask = async (req, res) => {
  try {
    const { data, id } = req.body;
    if (!data || !id) {
      return res.status(400).json({ error: "Data and ID are required" });
    }
    await Task.findByIdAndUpdate(id, data);
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getTasks, addTask ,removeTask,setTaskDone,editTask};