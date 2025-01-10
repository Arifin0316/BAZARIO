"use client";

import { useState, useEffect } from "react";
import FormLogin from "@/components/auth/Form-login";
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
    </div>
  );
};

export default Login;
