import { prisma } from "@/lib/prisma";
import { UpdateRequirementContext } from "@/types/requirements";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: UpdateRequirementContext,
) {
  try {
    const { id } = await params;
    const requirementId = Number(id);
    const deletedAt = new Date();
    await prisma.requirements.update({
      where: {
        id: requirementId,
      },
      data: {
        deleted_at: deletedAt,
      },
    });

    await prisma.projectRequirements.updateMany({
      where: {
        requirement_id: requirementId,
      },
      data: {
        deleted_at: deletedAt,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete requirement:", error);

    return NextResponse.json(
      { error: "Failed to delete requirement" },
      { status: 500 },
    );
  }
}
