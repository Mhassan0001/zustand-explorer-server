import express from "express";
const router = express.Router();
import { createTask, remove, updateTodo } from "../controller/todo.js";
import { authMiddleware } from "../middleware/auth.js";

router.route("/create").post(authMiddleware, createTask);
router.route("/delete/:id").delete(authMiddleware, remove);
router.route("/update/:id").patch(authMiddleware, updateTodo);

export default router;
