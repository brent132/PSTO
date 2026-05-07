import { prisma } from "@/lib/prisma";
import { RequirementIdContext } from "@/types/requirements";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: RequirementIdContext) {
  try {
    const { id, requirementId } = await params;
    const projectId = Number(id);
    const requirement_id = Number(requirementId);
    const body = await req.json();
    await prisma.projectRequirements.upsert({
      where: {
        project_id_requirement_id: {
          project_id: projectId,
          requirement_id,
        },
      },
      update: {
        is_compiled: body.is_compiled,
        remarks: body.remarks,
      },
      create: {
        project_id: projectId,
        requirement_id,
        is_compiled: body.is_compiled,
        remarks: body.remarks,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to update project requirement:", error);

    return NextResponse.json(
      { error: "Failed to update project requirement" },
      { status: 500 },
    );
  }
}
