import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { requirement } = body;

    if (!requirement || requirement.trim() === "") {
      return NextResponse.json(
        { error: "Requirement is required" },
        { status: 400 },
      );
    }

    const newRequirement = await prisma.requirements.create({
      data: {
        requirement,
      },
    });

    return NextResponse.json(newRequirement, { status: 201 });
  } catch (error) {
    console.error("Failed to create requirement:", error);

    return NextResponse.json(
      { error: "Failed to create requirement" },
      { status: 500 },
    );
  }
}
