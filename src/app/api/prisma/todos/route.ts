import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const todos = await prisma.todos.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json({ message: "Success", data: todos });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Prisma.TodosUncheckedCreateInput;
  try {
    const todo = await prisma.todos.create({
      data: body,
      include: {
        category: true,
      },
    });
    return NextResponse.json({ message: "Success", data: todo });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
};
