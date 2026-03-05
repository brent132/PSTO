import { prisma } from "@/lib/prisma";
import { userListSelectNoPass } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Read the httpOnly cookie that you sey during login
  // Next.js lets you read cookies from the incoming request in a Route Handler.
  const session = req.cookies.get("session")?.value;

  // If there's mp cookie, user is not logged in.
  if (!session) {
    return NextResponse.json({ ok: false, me: null }, { status: 401 });
  }

  // cookie value format is: "uid:<userId>:<timestamp>"
  const parts = session.split(":");
  const prefix = parts[0];
  const userIdStr = parts[1];

  // Basic validation
  if (prefix !== "uid" || !userIdStr) {
    const res = NextResponse.json({ ok: false, me: null }, { status: 401 });
    res.cookies.delete("session");
    return res;
  }

  // Convert userId to number
  const userId = Number(userIdStr);
  if (!Number.isInteger(userId)) {
    const res = NextResponse.json({ ok: false, me: null }, { status: 401 });
    res.cookies.delete("session");
    return res;
  }

  // fetch the logged in user
  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: userListSelectNoPass,
  });

  //if user no longer exists, clear cookie and treat as logged out
  if (!me) {
    const res = NextResponse.json({ ok: false, me: null }, { status: 401 });
    res.cookies.delete("session");
    return res;
  }

  // return the user info for your UI
  return NextResponse.json({ ok: true, me }, { status: 200 });
}
