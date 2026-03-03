"use client";

import { useQuery } from "@tanstack/react-query";
import { Loading } from "./loading";
import { UserListItem } from "@/lib/user";

const getUsers = async (): Promise<UserListItem[]> => {
  const response = await fetch("/api/users");
  return await response.json();
};
export function Users() {
  const {
    data: users,
    isPending: usersPending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  if (usersPending) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
