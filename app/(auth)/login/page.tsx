"use client";

import { useState, useEffect } from "react";
import FormLogin from "@/components/auth/Form-login";
import { GoogleButton, GihubButton } from "@/components/auth/social-button";
const Login = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render null saat di server-side
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">SignIn to your account</h1>
      <FormLogin />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 font-semibold text-gray-600">or</p>
      </div>
      <GoogleButton />
      <GihubButton />
    </div>
  );
};

export default Login;
