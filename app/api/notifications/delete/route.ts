import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parts = session.split(":");
    const prefix = parts[0];
    const userIdStr = parts[1];

    if (prefix !== "uid" || !userIdStr) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("session");
      return res;
    }

    const userId = Number(userIdStr);

    if (!Number.isInteger(userId)) {
      const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      res.cookies.delete("session");
      return res;
    }

    const body = await req.json();
    const recipientId = Number(body.recipientId);

    if (!Number.isInteger(recipientId)) {
      return NextResponse.json(
        { error: "Invalid recipientId" },
        { status: 400 },
      );
    }

    const result = await prisma.notification_recipients.updateMany({
      where: {
        id: recipientId,
        user_id: userId,
        deleted_at: null,
        notification: {
          deleted_at: null,
        },
      },
      data: {
        deleted_at: new Date(),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Notification deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete notification:", error);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 },
    );
  }
}
