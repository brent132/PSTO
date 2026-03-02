
"use client";

import { useEffect, useState } from "react";
import type { UserListItem } from "@/lib/user";

export function Users() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/users", { method: "GET" });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data: UserListItem[] = await response.json();
        setUsers(data);
      } catch {
        setError("Could not load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      
    </div>
  );
}
