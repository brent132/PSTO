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
import { SignUpProps } from "@/types/signup";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    role: "USER",
  });
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setForm({
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        password: "",
        role: "USER",
      });
      toast.success(
        <p className="text-success">Account created successfully</p>,
      );
    },
    onError: () => {
      toast.error(<p className="text-destructive">Something went wrong</p>);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-muted-foreground">Username</label>
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
          <label className="text-sm text-muted-foreground">First name</label>
          <Input
            value={form.firstName}
            onChange={(e) =>
              setForm((p) => ({ ...p, firstName: e.target.value }))
            }
            id="input-field-firstname"
            type="text"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Last name</label>
          <Input
            value={form.lastName}
            onChange={(e) =>
              setForm((p) => ({ ...p, lastName: e.target.value }))
            }
            id="input-field-lastname"
            type="text"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Middle name</label>
          <Input
            value={form.middleName ?? ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, middleName: e.target.value }))
            }
            id="input-field-middlename"
            type="text"
            placeholder="Enter your middle name"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Suffix</label>
          <Input
            value={form.suffix ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, suffix: e.target.value }))}
            id="input-field-suffix"
            type="text"
            placeholder="Enter your suffix"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Pick Role</label>
          <Select
            value={form.role}
            onValueChange={(value: "USER" | "ADMIN") =>
              setForm((prev) => ({ ...prev, role: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <div className="relative">
            <Input
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              id="input-field-password"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              minLength={6}
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
