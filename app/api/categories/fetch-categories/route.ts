import { categoriesListSelect } from "@/lib/categories";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const category = await prisma.categories.findMany({
      select: categoriesListSelect,
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
