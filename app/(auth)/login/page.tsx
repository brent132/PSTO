"use client"
import { Button } from "@/components/ui/button";
import { LoginPayload, LoginResponse } from "@/lib/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function LoginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = (await res.json()) as LoginResponse;

  if (!res.ok || !data.ok) {
    throw new Error(data.message ?? "Login Failed");
  }

  return data;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: LoginRequest,
    onSuccess: () => {
      router.push("/")
      router.refresh();
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginMutation.mutate(form)
    }}
    >
      <input 
        value={form.username}
        onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
        placeholder="enter your username"
      />
      <input 
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        placeholder="enter your password"
      />

      {loginMutation.isError ? (
        <p className="text-destructive">{loginMutation.error.message}</p>
      ) : null}

      <Button type="submit" disabled={loginMutation.isPending}>Login</Button>
    </form>
  )
}