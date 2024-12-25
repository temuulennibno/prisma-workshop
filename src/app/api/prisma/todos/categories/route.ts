import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const categories = await prisma.todoCategory.findMany({});
    return NextResponse.json({ message: "Success", data: categories });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as Prisma.TodoCategoryCreateInput;
    const category = await prisma.todoCategory.create({ data: body });
    return NextResponse.json({ message: "Success", data: category });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};
