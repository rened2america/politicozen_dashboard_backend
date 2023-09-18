"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLogin } from "@/app/login/useUserLogin";
import { useRouter } from "next/navigation";
import { useUserRegister } from "@/app/register/useUserRegister";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const {
    data,
    isLoading,
    mutate: register,
    isSuccess,
    isError,
  } = useUserRegister();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");

  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    register({ name, email: email, password: pass });
  }

  React.useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Patrick Jane"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="**********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setPass(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <h1>Spiner</h1>}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
