import { categorieListSelect } from "@/lib/categories";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const category = await prisma.categories.create({
      data: {
        category_name: body.category_name,
        created_at: body.created_at,
      },
      select: categorieListSelect,
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to add category:", error);
    return NextResponse.json(
      { error: "Failed to create Category" },
      { status: 500 },
    );
  }
}
