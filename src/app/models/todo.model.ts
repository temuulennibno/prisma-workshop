import mongoose, { Schema, Document, Model, models } from "mongoose";
import { ITodoCategory } from "./todo-category.model";
import { nanoid } from "nanoid";

export interface ITodo extends Document {
  name: string;
  description?: string;
  completed: boolean;
  category: mongoose.Types.ObjectId | ITodoCategory;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    _id: { type: String, default: nanoid() },
    name: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    category: {
      type: String,
      ref: "TodoCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
