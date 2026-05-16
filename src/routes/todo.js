import express from "express";
const router = express.Router();
import { createTask, remove, updateTodo } from "../controller/todo.js";

router.route("/create").post(createTask);
router.route("/delete/:id").delete(remove);
router.route("/update/:id").patch(updateTodo);

export default router;
