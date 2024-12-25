import dbConnect from "@/app/lib/dbConnect";
import TodoCategory from "@/app/models/todo-category.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const categories = await TodoCategory.find({});
    return NextResponse.json({ message: "Success", data: categories });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { name, description } = await req.json();
    const category = await TodoCategory.create({ name, description });
    return NextResponse.json({ message: "Success", data: category });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};
