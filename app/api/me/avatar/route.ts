import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // read you session cookie
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json(
      { ok: false, message: "Not logged in" },
      { status: 401 },
    );
  }

  // cookie format
  const [prefix, userIdStr] = session.split(":");
  const userId = Number(userIdStr);

  if (prefix !== "uid" || !Number.isInteger(userId)) {
    const res = NextResponse.json(
      { ok: false, message: "Invalid session" },
      { status: 401 },
    );
    res.cookies.delete("session");
    return res;
  }

  //read multipart/form data from the request
  const form = await req.formData();

  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { ok: false, message: "No file uploaded" },
      { status: 400 },
    );
  }

  // validate
  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { ok: false, message: "Unsupported file type" },
      { status: 400 },
    );
  }

  const MAX = 2 * 1024 * 1024; // 2mb
  if (file.size > MAX) {
    return NextResponse.json(
      { ok: false, message: "File too large: max 2mb" },
      { status: 400 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  // save to database
  await prisma.user.update({
    where: { id: userId },
    data: {
      profileImage: bytes,
      profileImageMime: file.type,
    },
  });

  return NextResponse.json({ ok: true });
}
