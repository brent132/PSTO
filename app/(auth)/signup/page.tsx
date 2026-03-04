"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateUserInput } from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

async function createUser(payload: CreateUserInput) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed Creating Account");
  return res.json();
}

export default function SignUp() {
  const [message, setMessage] = useState("");
  const qc = useQueryClient();
  const [form, setForm] = useState<CreateUserInput>({
    username: "",
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
        username: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        password: "",
      });
      setMessage("Sign up successful");
    },
    onError: () => {
      setMessage("Failed to create account");
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
          <label className="text-sm text-muted-foreground">Password</label>
          <Input
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            id="input-field-password"
            type="password"
            placeholder="Enter your password"
            minLength={6}
            required
          />
        </div>
      </div>

      {message && (
        <p className={mutation.isSuccess ? "text-success" : "text-destructive"}>
          {message}
        </p>
      )}
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? <p>Loading...</p> : <p>Sign Up</p>}
      </Button>
    </form>
  );
}
