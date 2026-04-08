import { prisma } from "@/lib/prisma";
import { projectListSelect } from "@/lib/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanBudget = Number(String(body.budget).replace(/,/g, ""));

    if (Number.isNaN(cleanBudget)) {
      return NextResponse.json(
        { message: "Invalid budget value" },
        { status: 400 },
      );
    }

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

    const project = await prisma.$transaction(async (tx) => {
      const createdProject = await tx.projects.create({
        data: {
          project_code: body.project_code,
          project_name: body.project_name,
          fiscal_year: body.fiscal_year,
          budget: cleanBudget,
          start_date: body.start_date,
          end_date: body.end_date,
          status: body.status,
          description: body.description,
          manager_name: body.manager_name,
        },
      });

      const recipients = await tx.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
        },
      });

      const notification = await tx.notifications.create({
        data: {
          title: "New Project Created",
          message: `${createdProject.project_name} (${createdProject.project_code}) was created.`,
          type: "PROJECT_CREATED",
          priority: "MEDIUM",
          created_by: userId,
          reference_type: "PROJECT",
          reference_id: createdProject.id,
          action_url: `/projects?q=${encodeURIComponent(createdProject.project_code)}`,
        },
      });

      if (recipients.length > 0) {
        await tx.notification_recipients.createMany({
          data: recipients.map((recipient) => ({
            notification_id: notification.id,
            user_id: recipient.id,
          })),
        });
      }

      return tx.projects.findUnique({
        where: { id: createdProject.id },
        select: projectListSelect,
      });
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
