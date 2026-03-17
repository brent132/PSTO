import { prisma } from "@/lib/prisma";
import { projectListSelect } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cleanBudget = Number(String(body.budget).replace(/,/g, ""));

    if (Number.isNaN(cleanBudget)) {
      return NextResponse.json(
        { message: "Invalid budget value" },
        { status: 400 },
      );
    }

    const project = await prisma.projects.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
