"use client";

import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
