import { prisma } from "@/lib/prisma";
import { UpdateRequirementContext } from "@/types/requirements";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: UpdateRequirementContext,
) {
  try {
    const { id } = await params;
    const requirementsId = Number(id);
    const body = await req.json();
    const requirement = await prisma.requirements.update({
      where: {
        id: requirementsId,
      },
      data: {
        requirement: body.requirement,
      },
    });

    return NextResponse.json({
      data: requirement,
    });
  } catch (error) {
    console.error("Failed to update requirement:", error);

    return NextResponse.json(
      { error: "Failed to update requirement" },
      { status: 500 },
    );
  }
}
