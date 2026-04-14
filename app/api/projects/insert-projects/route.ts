import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Insert project to database
export async function POST(req: Request) {
  try {
    const body: { project_title?: string } = await req.json();
    const projectTitle = body.project_title?.trim();

    if (!projectTitle) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 },
      );
    }

    const project = await prisma.projects.create({
      data: {
        project_title: projectTitle,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
