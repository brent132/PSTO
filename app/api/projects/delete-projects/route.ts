import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body: { id: number } = await req.json();

    await prisma.projects.update({
      where: {
        id: body.id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 5000 },
    );
  }
}
