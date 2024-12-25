import dbConnect from "@/app/lib/dbConnect";
import TodoCategory from "@/app/models/todo-category.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, { params }: { params: { _id: string } }) => {
  try {
    await dbConnect();
    const { _id } = params;
    const category = await TodoCategory.findOne({ _id });
    return NextResponse.json({ message: "Success", data: category });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { _id: string } }) => {
  try {
    await dbConnect();
    const { _id } = params;
    const { name, description } = await req.json();
    const category = await TodoCategory.findOneAndUpdate({ _id }, { name, description }, { new: true });
    return NextResponse.json({ message: "Success", data: category });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { _id: string } }) => {
  try {
    await dbConnect();
    const { _id } = params;
    const category = await TodoCategory.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Success", data: category });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};
