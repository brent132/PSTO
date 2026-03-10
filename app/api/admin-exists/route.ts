import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // look for any user that already has admin role
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    // if admin is found => admin role is already taken
    return NextResponse.json(
      {
        ok: true,
        adminExists: !!admin,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ADMIN CHECK ERROR", error);

    return NextResponse.json(
      {
        ok: false,
        adminExist: false,
        message: "Failed to check admin role",
      },
      { status: 500 },
    );
  }
}
