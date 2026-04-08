import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const [prefix, userIdStr] = session.split(":");
    const userId = Number(userIdStr);

    if (prefix !== "uid" || !Number.isInteger(userId)) {
      const res = NextResponse.json(
        { error: "Invalid session" },
        { status: 401 },
      );
      res.cookies.delete("session");
      return res;
    }

    const body = await req.json();

    const username = body.username?.trim();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const middleName = body.middleName?.trim() || null;
    const suffix = body.suffix?.trim() || null;

    if (!username || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Username, first name, and last name are required" },
        { status: 400 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (username !== currentUser.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        firstName,
        lastName,
        middleName,
        suffix,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        middleName: true,
        suffix: true,
        role: true,
      },
    });

    return NextResponse.json({
      user: updatedUser,
    });
  } catch (error) {
    console.error("Edit credentials error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
