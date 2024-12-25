import mongoose, { Schema, Document, Model, models } from "mongoose";
import { nanoid } from "nanoid";

export interface ITodoCategory extends Document {
  name: string;
  description?: string;
}

const TodoCategorySchema = new Schema<ITodoCategory>(
  {
    _id: { type: String, default: nanoid() },
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const TodoCategory: Model<ITodoCategory> = models.TodoCategory || mongoose.model<ITodoCategory>("TodoCategory", TodoCategorySchema);

export default TodoCategory;
