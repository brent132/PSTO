import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = 10;
    const search = searchParams.get("search") ?? "";

    const where = {
      deleted_at: null,
      project_title: {
        contains: search,
      },
    };

    const projects = await prisma.projects.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.projects.count({
      where,
    });

    return NextResponse.json({
      data: projects,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
