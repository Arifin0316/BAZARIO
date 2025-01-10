"use client";

import { useState, useEffect } from "react";
import FormRegister from "@/components/auth/Form-register";

const Register = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render null saat di server-side
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
      <FormRegister/>
    </div>
  );
};

export default Register;
