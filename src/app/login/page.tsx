"use client";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserLogin } from "./useUserLogin";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuthForm } from "../components/auth/components/user-auth-form";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useGetUserIsLogin } from "@/hooks/useUserLogin";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, isLoading, mutate: login, isSuccess, isError } = useUserLogin();
  // const { isSuccess: userIsLogin } = useGetUserIsLogin();

  // useEffect(() => {
  //   if (userIsLogin) {
  //     router.push("/dashboard2");
  //   }
  // }, [userIsLogin]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard2");
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    login({ email, password }); // Login api call
  };

  // return (
  //   <div>
  //     <form>
  //       <input
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         type="email"
  //       />
  //       <input
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         type="password"
  //       />
  //       <button onClick={handleSubmit} type="submit">
  //         Submit
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <>
      <div className="container relative h-screen	flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Create an account
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL_ECOMMERCE}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute md:left-0 lg:left-1/2 top-4 md:top-8"
          )}
        >
          Go Home
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Politicozen
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
              <p className="text-sm text-muted-foreground">
                Please enter your email to log in
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
