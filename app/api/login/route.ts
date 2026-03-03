import { prisma } from "@/lib/prisma";
import { userListSelect } from "@/lib/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: "Missing username or password" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { username },
    select: userListSelect,
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "session",
    value: `uid:${user.id}:${Date.now()}`,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
