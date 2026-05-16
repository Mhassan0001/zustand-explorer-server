import Todo from "../model/todo.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";

//! =================================================

const createTask = asyncHandler(async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    throw new AppError("Valid task is required", 400);
  }

  const newTodo = await Todo.create({ task });

  res.status(201).json({
    success: true,
    data: newTodo,
  });
});

//! =================================================

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const removeTodo = await Todo.findByIdAndDelete(id);

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
  const { id } = req.params;
  const { task, status } = req.body;

  const updateTodo = await Todo.findByIdAndUpdate(
    id,
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

export { createTask, remove, updateTodo };
