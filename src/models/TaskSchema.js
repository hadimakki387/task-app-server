const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isDone :{type:Boolean , default:false},
  taskOwner:{type:String,required:true}
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
