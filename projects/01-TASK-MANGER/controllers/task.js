const Task = require("../models/tasks");

const asyncWrapper = require("../middlewares/async");

const { createCustomError } = require("../errors/cusom-errors");
const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //res.status(200).json({tasks, amount:tasks.length });
  // res.status(200).json({status:"success",data:{tasks,nbhtits:tasks.length}  });
});

const createTask = asyncWrapper(async (req, res) => {
  const sdsd = await Task.create(req.body);
  res.status(201).json({ sdsd });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
  
    return next(createCustomError(`no taskid with : ${taskid}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskid } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskid }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`no taskid with : ${taskid}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no taskid with : ${taskid}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
