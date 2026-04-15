import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body: { id: number; project_title?: string } = await req.json();

    const project = await prisma.projects.update({
      where: {
        id: body.id,
      },
      data: {
        project_title: body.project_title,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
