import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { projectListSelect } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // make sure project id exists
    const projectId = Number(body.id);

    if (!projectId || Number.isNaN(projectId)) {
      return NextResponse.json(
        { message: "Valid project id is required" },
        { status: 400 },
      );
    }

    // clean and validate budget first
    const cleanBudget = Number(String(body.budget).replace(/,/g, ""));

    if (Number.isNaN(cleanBudget)) {
      return NextResponse.json(
        { message: "Invalid budget value" },
        { status: 400 },
      );
    }

    // update project
    const project = await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        project_code: body.project_code,
        project_name: body.project_name,
        fiscal_year: body.fiscal_year,
        budget: cleanBudget,
        start_date: body.start_date,
        end_date: body.end_date,
        status: body.status,
        description: body.description,
        manager_name: body.manager_name,
      },
      select: projectListSelect,
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Failed to update project", error);

    // prisma error when record does not exist
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
