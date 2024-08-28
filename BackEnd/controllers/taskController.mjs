import express from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/Task.mjs"; // Import Task model

const router = express.Router();

// @desc Get all tasks for a user
// @route GET /tasks
// @access Private
const getTasks = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  try {
    // Check if the tasks document for the given userEmail exists
    const userTasks = await Task.findOne({ userEmail }).lean();

    // If no tasks found for the userEmail, return 404
    if (!userTasks) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    // Return the tasks array from the found document
    res.json(userTasks.tasks);
  } catch (error) {
    // Handle potential server errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create a new task
// @route POST /tasks
// @access Private
const addTask = async (req, res) => {
  const { userEmail, title, description, dueDate, priority, status } = req.body;

  if (!userEmail || !title || !description || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let userTasks = await Task.findOne({ userEmail });

  if (!userTasks) {
    // Create a new document if it does not exist
    userTasks = await Task.create({ userEmail, tasks: [] });
  }

  userTasks.tasks.push({
    title,
    description,
    dueDate,
    priority,
    status,
  });

  await userTasks.save();

  res.status(201).json(userTasks.tasks);
};

// @desc Update a task
// @route PATCH /tasks/:taskId
// @access Private
const updateTask = async (req, res) => {
  const { userEmail } = req.query; // Get user email from query params
  const { taskId } = req.params;
  const updates = req.body;

  if (!userEmail || !taskId) {
    return res
      .status(400)
      .json({ message: "User email and task ID are required" });
  }

  const userTasks = await Task.findOne({ userEmail });

  if (!userTasks) {
    return res.status(404).json({ message: "Tasks not found for this user" });
  }

  const taskIndex = userTasks.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update task details
  Object.assign(userTasks.tasks[taskIndex], updates);

  // Update history
  userTasks.tasks[taskIndex].history.push({
    action: "updated",
    details: "Task updated with new data",
  });

  await userTasks.save();

  res.json(userTasks.tasks[taskIndex]);
};

// @desc Delete a task
// @route DELETE /tasks/:taskId
// @access Private
const deleteTask = async (req, res) => {
  const { userEmail } = req.query; // Get user email from query params
  const { taskId } = req.params;

  if (!userEmail || !taskId) {
    return res
      .status(400)
      .json({ message: "User email and task ID are required" });
  }

  const userTasks = await Task.findOne({ userEmail });

  if (!userTasks) {
    return res.status(404).json({ message: "Tasks not found for this user" });
  }

  userTasks.tasks = userTasks.tasks.filter(
    (task) => task._id.toString() !== taskId
  );

  await userTasks.save();

  res.json({ message: `Task with ID ${taskId} deleted` });
};

export { getTasks, addTask, updateTask, deleteTask };
