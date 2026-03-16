import { Prisma } from "@prisma/client";

export const projectListSelect = {
  id: true,
  project_code: true,
  project_name: true,
  fiscal_year: true,
  budget: true,
  start_date: true,
  end_date: true,
  status: true,
  description: true,
  manager_name: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.ProjectsSelect;
