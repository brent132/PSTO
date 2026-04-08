"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginProps, LoginResponse } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignUp from "../signup/page";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import fund_tracker_logo from "@/public/fund tracker 2.png";
import Image from "next/image";
import { toast } from "sonner";

async function LoginRequest(payload: LoginProps): Promise<LoginResponse> {
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
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<LoginProps>({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: LoginRequest,
    onSuccess: () => {
      router.push("/");
      router.refresh();
      toast.success(<p className="text-success">Logged in successfull</p>);
    },
    onError: () => {
      toast.error(
        <p className="text-destructive">Incorrect Username or Password</p>,
      );
    },
  });

  return (
    <div className="max-w-xs h-screen mx-auto flex flex-col items-center justify-center gap-4">
      <div className="w-25 h-auto aspect-square">
        <Image
          src={fund_tracker_logo}
          alt="fund-tracker"
          loading="eager"
          sizes="fill"
        />
      </div>
      <Tabs defaultValue="Login" className="flex gap-8 items-center">
        <TabsList className="w-full border min-h-10">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(form);
            }}
            className="flex flex-col gap-4 min-w-xs"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  USERNAME
                </label>
                <Input
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, username: e.target.value }))
                  }
                  id="input-field-username"
                  type="text"
                  placeholder="Username"
                  className="text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  PASSWORD
                </label>
                <div className="relative">
                  <Input
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    id="input-field-password"
                    type={show ? "text" : "password"}
                    minLength={6}
                    placeholder="Password"
                    className="text-xs"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-0 text-muted-foreground hover:bg-transparent"
                  >
                    {show ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
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
