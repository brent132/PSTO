import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userListSelect } from "@/lib/user";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
      select: userListSelect,
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Unable to fetch users" },
      { status: 500 },
    );
  }
}
