import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userListSelect } from "@/lib/user";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

//Insert users to database
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const passwordHash = await bcrypt.hash(body.password, 10);

    const allowedRoles = [Role.USER, Role.ADMIN, Role.SETUP, Role.PROGRAM];

    const user = await prisma.user.create({
      data: {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        suffix: body.suffix ?? null,
        middleName: body.middleName ?? null,
        password: passwordHash,
        role: allowedRoles.includes(body.role) ? body.role : Role.USER,
      },
      select: userListSelect,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
