import { NextResponse } from "next/server";

export async function POST() {
  // create a response
  const res = NextResponse.json({ ok: true });

  // delete cookie properly
  res.cookies.delete("session");

  res.cookies.set({
    name: "session",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}
