"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginPayload, LoginResponse } from "@/lib/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignUp from "../signup/page";
import { Input } from "@/components/ui/input";

async function LoginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as LoginResponse;

  if (!res.ok || !data.ok) {
    throw new Error(data.message ?? "Login Failed");
  }

  return data;
}

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: LoginRequest,
    onSuccess: () => {
      router.push("/");
      router.refresh();
      setMessage("Logged in successful");
    },
    onError: () => {
      setMessage("Wrong Password or Username");
    },
  });

  return (
    <div className="max-w-xs h-screen mx-auto flex items-center justify-center">
      <Tabs defaultValue="Login" className="flex gap-8 items-center">
        <TabsList className="w-full">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(form);
            }}
            className="flex flex-col gap-4"
          >
            {message && (
              <p
                className={
                  loginMutation.isSuccess ? "text-success" : "text-destructive"
                }
              >
                {message}
              </p>
            )}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm">Username</label>
                <Input
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, username: e.target.value }))
                  }
                  id="input-field-username"
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <Input
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  id="input-field-password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="Signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
