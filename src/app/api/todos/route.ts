import dbConnect from "@/app/lib/dbConnect";
import TodoCategory from "@/app/models/todo-category.model";
import Todo from "@/app/models/todo.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const todos = await Todo.find({}).populate("category");
    return NextResponse.json({ message: "Success", data: todos });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { name, description, category } = await req.json();

    const existingCategory = await TodoCategory.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ message: "Error", error: "Invalid category ID" }, { status: 400 });
    }

    let todo = await Todo.create({ name, description, category });

    todo = await todo.populate("category");

    return NextResponse.json({ message: "Success", data: todo });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};
