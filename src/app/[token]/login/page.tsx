"use client";
import { useEffect } from "react";
import { useUserLogin } from "./useUserLogin";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  params: {
    token: string;
  };
}

export default function LoginPage({ params }: LoginPageProps) {
  const { token } = params;
  const router = useRouter();
  
  const { data, isLoading, mutate: login, isSuccess, isError } = useUserLogin();

  // Call `login` once when component mounts or when `token` changes
  useEffect(() => {
    if (!token) return;
    login({ loginToken: token });
  }, [token, login]);

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess, router]);

  return (
    <div>
      <h1>Logging you in, please wait...</h1>      
    </div>
  );
}
