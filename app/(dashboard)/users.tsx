
"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
};

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/users", { method: "GET" });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data: User[] = await response.json();
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

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((user) => {
            const fullName = [
              user.firstName,
              user.middleName,
              user.lastName,
              user.suffix,
            ]
              .filter(Boolean)
              .join(" ");

            return <li key={user.id}>{fullName}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
