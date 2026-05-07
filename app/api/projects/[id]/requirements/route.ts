import { prisma } from "@/lib/prisma";
import { Context } from "@/types/requirements";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: Context) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    const project = await prisma.projects.findFirst({
      where: {
        id: projectId,
        deleted_at: null,
      },
      select: {
        id: true,
        project_title: true,
      },
    });

    const requirements = await prisma.requirements.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        projects: {
          where: {
            project_id: projectId,
            deleted_at: null,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const data = requirements.map((requirement) => {
      const saved = requirement.projects[0];

      return {
        requirement_id: requirement.id,
        requirement: requirement.requirement,
        is_compiled: saved?.is_compiled ?? false,
        remarks: saved?.remarks ?? "",
      };
    });

    return NextResponse.json({ data, project });
  } catch (error) {
    console.error("Failed to fetch project requirements:", error);

    return NextResponse.json(
      { error: "Failed to fetch projects requirements" },
      { status: 500 },
    );
  }
}
