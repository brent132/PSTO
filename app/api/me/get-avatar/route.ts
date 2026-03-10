import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // read session cookie
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return new NextResponse("Not logged in", { status: 401 });
  }
  // cookie format
  const [prefix, userIdStr] = session.split(":");
  const userId = Number(userIdStr);

  if (prefix !== "uid" || !Number.isInteger(userId)) {
    const res = new NextResponse("Invalid session", { status: 401 });
    res.cookies.delete("session");
    return res;
  }

  // get image from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      profileImage: true,
      profileImageMime: true,
    },
  });

  if (!user || !user.profileImage) {
    return new NextResponse("No avatar found", { status: 404 });
  }

  // use saved mime type
  const mimeType = user.profileImageMime || "application/octet-stream";

  // turn byts into blob
  const blob = new Blob([user.profileImage], { type: mimeType });

  // return real image NextResponse
  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "no-store",
    },
  });
}
