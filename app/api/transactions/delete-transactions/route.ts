import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body: { id: number } = await req.json();
    const transactionId = Number(body.id);

    if (!transactionId || Number.isNaN(transactionId)) {
      return NextResponse.json(
        { message: "Valid transaction id is required" },
        { status: 400 },
      );
    }

    await prisma.transactions.delete({
      where: {
        id: transactionId,
      },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Failed to delete project:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Failed to delete transaction" },
      { status: 500 },
    );
  }
}
