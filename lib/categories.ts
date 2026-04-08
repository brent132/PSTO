import { Prisma } from "@prisma/client";

export const categoriesListSelect = {
  id: true,
  category_name: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.CategoriesSelect;
