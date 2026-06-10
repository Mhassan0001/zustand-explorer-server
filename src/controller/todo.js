import Todo from "../model/todo.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";

//! =================================================

const getTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user._id;
  const role = req.user.role;
  let filter = role === "admin" ? { _id: id } : { createdBy };

  const response = await Todo.find(filter);

  res.status(200).json({ success: true, data: response });
});

//! =================================================

const createTask = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const { task } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    throw new AppError("Valid task is required", 400);
  }

  const newTodo = await Todo.create({
    task,
    createdBy,
  });

  res.status(201).json({
    success: true,
    data: newTodo,
  });
});

//! =================================================

const remove = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const { id } = req.params;
  let role = req.user.role;
  let filter = role === "admin" ? { _id: id } : { _id: id, createdBy };

  const removeTodo = await Todo.findOneAndDelete(filter);

  if (!removeTodo) {
    throw new AppError("Todo not Found....", 404);
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: removeTodo,
  });
});

//! =================================================

const updateTodo = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const { id } = req.params;
  const { task, status } = req.body;
  let role = req.user.role;
  let filter = role === "admin" ? { _id: id } : { _id: id, createdBy };
  const updateTodo = await Todo.findOneAndUpdate(
    filter,
    {
      task,
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updateTodo) {
    throw new AppError("Todo not Found....", 404);
  }

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: updateTodo,
  });
});

//! =================================================

export { createTask, remove, updateTodo ,getTodo};
