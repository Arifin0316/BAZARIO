"use client";

import { useSearchParams } from "next/navigation";
import FormLogin from "@/components/auth/Form-login";
import { GoogleButton, GihubButton } from "@/components/auth/social-button";

const Login = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Sign In to your account</h1>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">
            {error === "OAuthAccountNotLinked"
              ? "Account already used by another provider."
              : `Error: ${error}`}
          </span>
        </div>
      )}
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
