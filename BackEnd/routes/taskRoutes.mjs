import express from "express";
const router = express.Router();

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.mjs";

router
  .route("/")
  .get(getTasks)
  .post(addTask)
  .patch(updateTask)
  .delete(deleteTask);

export default router;
