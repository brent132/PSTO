"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminExistsProps } from "@/types/admin-exists";
import { SignUpProps } from "@/types/signup";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

async function createUser(payload: SignUpProps) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed Creating Account");
  return res.json();
}

async function checkAdminExists() {
  const res = await fetch("/api/admin-exists");
  if (!res.ok) throw new Error("Failed to check admin");
  return res.json() as Promise<AdminExistsProps>;
}

export default function SignUp() {
  const [show, setShow] = useState(false);
  const qc = useQueryClient();
  const [form, setForm] = useState<SignUpProps>({
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    password: "",
    role: "",
  });
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["users"] }),
        qc.invalidateQueries({ queryKey: ["admin-exists"] }),
      ]);
      setForm({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        password: "",
        role: "",
      });
      toast.success(
        <p className="text-success">Account created successfully</p>,
      );
    },
    onError: () => {
      toast.error(<p className="text-destructive">Something went wrong</p>);
    },
  });

  const { data: admin } = useQuery({
    queryKey: ["admin-exists"],
    queryFn: checkAdminExists,
  });

  const adminExists = admin?.adminExists ?? false;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <div>
          <label className="text-xs text-muted-foreground">USERNAME</label>
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
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">FIRST NAME</label>
            <Input
              value={form.firstName}
              onChange={(e) =>
                setForm((p) => ({ ...p, firstName: e.target.value }))
              }
              id="input-field-firstname"
              type="text"
              placeholder="First"
              className="text-xs"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">LAST NAME</label>
            <Input
              value={form.lastName}
              onChange={(e) =>
                setForm((p) => ({ ...p, lastName: e.target.value }))
              }
              id="input-field-lastname"
              type="text"
              placeholder="Last"
              className="text-xs"
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-2">
            <label className="text-xs text-muted-foreground">MIDDLE NAME</label>
            <Input
              value={form.middleName ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, middleName: e.target.value }))
              }
              id="input-field-middlename"
              type="text"
              placeholder="Middle"
              className="text-xs"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">SUFFIX</label>
            <Input
              value={form.suffix ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, suffix: e.target.value }))
              }
              id="input-field-suffix"
              type="text"
              placeholder="Jr."
              className="text-xs"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">ROLE</label>
          <Select
            value={form.role}
            onValueChange={(value: "USER" | "ADMIN" | "SETUP" | "PROGRAM") =>
              setForm((prev) => ({ ...prev, role: value }))
            }
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="USER">User</SelectItem>
                {!adminExists && <SelectItem value="ADMIN">Admin</SelectItem>}
                <SelectItem value="SETUP">Setup</SelectItem>
                <SelectItem value="PROGRAM">Program</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">PASSWORD</label>
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

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? <p>Loading...</p> : <p>Sign Up</p>}
      </Button>
    </form>
  );
}
