import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { projectListSelect } from "@/lib/projects";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const projectId = Number(body.id);

    if (!projectId || Number.isNaN(projectId)) {
      return NextResponse.json(
        { message: "Valid project id is required" },
        { status: 400 },
      );
    }

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
      const updatedProject = await tx.projects.update({
        where: {
          id: projectId,
        },
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
          title: "Project Updated",
          message: `${updatedProject.project_name} (${updatedProject.project_code}) was updated.`,
          type: "PROJECT_UPDATED",
          priority: "HIGH",
          created_by: userId,
          reference_type: "PROJECT",
          reference_id: updatedProject.id,
          action_url: `/projects?q=${encodeURIComponent(updatedProject.project_code)}`,
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
        where: {
          id: updatedProject.id,
        },
        select: projectListSelect,
      });
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Failed to update project", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 400 },
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Project code already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
