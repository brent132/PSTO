import type { Prisma } from "@prisma/client";

export const userListSelect = {
  id: true,
  username: true,
  firstName: true,
  middleName: true,
  lastName: true,
  suffix: true,
  role: true,
  password: true,
} satisfies Prisma.UserSelect;

export const userListSelectNoPass = {
  id: true,
  username: true,
  firstName: true,
  middleName: true,
  lastName: true,
  suffix: true,
  role: true,
} satisfies Prisma.UserSelect;

export type UserListItem = Prisma.UserGetPayload<{
  select: typeof userListSelect;
}>;

export type CreateUserInput = Omit<UserListItem, "id">;
