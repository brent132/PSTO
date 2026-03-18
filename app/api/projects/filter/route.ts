import { prisma } from "@/lib/prisma";
import { projectListSelect } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status")?.trim() ?? "";
    const fiscalYear = searchParams.get("fiscal_year")?.trim() ?? "";

    const projects = await prisma.projects.findMany({
      where: {
        AND: [
          status && status !== "all"
            ? {
                status,
              }
            : {},
          fiscalYear && fiscalYear !== "all"
            ? {
                fiscal_year: fiscalYear,
              }
            : {},
          q
            ? {
                OR: [
                  { project_name: { contains: q } },
                  { project_code: { contains: q } },
                  { manager_name: { contains: q } },
                ],
              }
            : {},
        ],
      },
      select: projectListSelect,
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to filter projects:", error);

    return NextResponse.json(
      { error: "Failed to filter projects" },
      { status: 500 },
    );
  }
}
