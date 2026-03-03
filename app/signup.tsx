"use client";
import { Button } from "@/components/ui/button";
import { CreateUserInput } from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

async function createUser(payload: CreateUserInput) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export default function SignUp() {
  const qc = useQueryClient();
  const [form, setForm] = useState<CreateUserInput>({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    password: "",
  });
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        password: "",
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
    >
      <input
        value={form.firstName}
        onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
        placeholder="First name"
      />
      <input
        value={form.middleName ?? ""}
        onChange={(e) => setForm((p) => ({ ...p, middleName: e.target.value }))}
        placeholder="Middle name"
      />
      <input
        value={form.lastName}
        onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
        placeholder="Last name"
      />
      <input
        value={form.suffix ?? ""}
        onChange={(e) => setForm((p) => ({ ...p, suffix: e.target.value }))}
        placeholder="Suffix"
      />
      <input
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        placeholder="Password"
        required
        minLength={6}
      />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
}
