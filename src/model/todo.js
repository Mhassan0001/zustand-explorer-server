import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const collection = mongoose.model("Todo", todoSchema);

export default collection;
