import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const notifications = await prisma.notification_recipients.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
        notification: {
          deleted_at: null,
        },
      },
      orderBy: {
        delivered_at: "desc",
      },
      select: {
        id: true,
        is_read: true,
        read_at: true,
        delivered_at: true,
        notification: {
          select: {
            id: true,
            title: true,
            message: true,
            type: true,
            priority: true,
            reference_type: true,
            reference_id: true,
            action_url: true,
            created_at: true,
            creator: {
              select: {
                id: true,
                username: true,
                firstName: true,
                middleName: true,
                lastName: true,
                suffix: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}
