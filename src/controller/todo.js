import Todo from "../model/todo";

//! =================================================

const createTask = async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res
      .staus(400)
      .json({ success: false, message: "Valid task is required" });
  }

  const newTodo = await Todo.create({ task });

  res.status(201).json({
    success: true,
    data: newTodo,
  });
};

//! =================================================

const remove = async (req, res) => {
  const { id } = req.params;

  const removeTodo = await Todo.findByIdAndDelete(id);

  if (!removeTodo) {
    return res.status(404).json({
      success: false,
      msg: "Todo not Found....",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: removeTodo,
  });
};

//! =================================================

const updateTodo = async (req, res) => {
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
    return res.status(404).json({
      success: false,
      msg: "Todo not Found....",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: updateTodo,
  });
};

//! =================================================

export { createTask, remove, updateTodo };
