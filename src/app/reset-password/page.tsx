"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SyncLoader from "react-spinners/SyncLoader";
import { useResetPassword } from "../login/useUserLogin";

// Import Zod
import { z } from "zod";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract email/token from URL
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  // Local state for passwords
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Local state for errors
  const [zodError, setZodError] = React.useState<string | null>(null);

  // Custom mutation hook
  const { mutate: resetPassword, isLoading, isSuccess } = useResetPassword();

  // On success, alert + redirect
  React.useEffect(() => {
    if (isSuccess) {
      alert("Password reset successful! Redirecting to Login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [isSuccess, router]);

  // Handle form submission
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setZodError(null);

    // 1) Create a Zod schema for new password fields
    const passwordSchema = z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot exceed 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

    // 2) Combine into an object schema that ensures passwords match
    const resetSchema = z
      .object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    // 3) Safe-parse user input
    const result = resetSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      // Show the first error
      setZodError(result.error.issues[0].message);
      return;
    }

    // 4) Ensure valid email/token
    if (!email || !token) {
      setZodError("Invalid reset link or missing parameters.");
      return;
    }

    // 5) Call our mutation
    resetPassword({
      email,
      token,
      password: result.data.password,
    });
  }

  return (
    <div className="container lg:grid flex md:flex sm:flex relative h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Top-right: Create account link */}
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Create an account
      </Link>

      {/* Left side banner */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL_ECOMMERCE!}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          Politicozen
        </Link>
      </div>

      {/* Right side form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below.
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                {/* New password */}
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="New Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Confirm password */}
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* Display Zod error (e.g., mismatch, complexity) */}
                {zodError && (
                  <span className="text-red-400">{zodError}</span>
                )}

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <SyncLoader loading={isLoading} color="white" size={8} />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
