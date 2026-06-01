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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: "auth",
    },
  },
  { timestamps: true },
);

const collection = mongoose.model("Todo", todoSchema);

export default collection;
