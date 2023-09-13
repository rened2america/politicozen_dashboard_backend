"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLogin } from "@/app/login/useUserLogin";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, isLoading, mutate: login, isSuccess, isError } = useUserLogin();
  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    login({ email: "rene", password: "data" });
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
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <h1>Spiner</h1>}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
