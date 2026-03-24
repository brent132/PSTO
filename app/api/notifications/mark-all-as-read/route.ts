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

    const result = await prisma.notification_recipients.updateMany({
      where: {
        user_id: userId,
        is_read: false,
        deleted_at: null,
        notification: {
          deleted_at: null,
        },
      },
      data: {
        is_read: true,
        read_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "All notifications marked as read",
        count: result.count,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark all notifications as read" },
      { status: 500 },
    );
  }
}
