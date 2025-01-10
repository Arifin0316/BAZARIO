"use server";

import { prisma } from "./prisma";
import { registerSchema, SignInSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";
import {signIn} from "@/auth"


export const SignUpCredential = async (prevState: unknown, formData: FormData) => {
  const validateField = registerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateField.success) {
    const fieldErrors = validateField.error.flatten().fieldErrors;
    // Convert array of errors to single string
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value?.join(', ') || ''])
    );
    return { errors };
  }

  const { name, email, password } = validateField.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "Email is already registered." };
  }

  redirect("/login");
};


// sign in credensial profeder

export const SignInCredentials = async (prevState: unknown, formData: FormData) => {
  const validateField = SignInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateField.success) {
    const fieldErrors = validateField.error.flatten().fieldErrors;
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value?.join(", ") || ""])
    );
    return { errors };
  }

  const { email, password } = validateField.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      switch (result.error) {
        case "CredentialsSignin":
          return { message: "Invalid email or password" };
        default:
          return { message: "Authentication failed" };
      }
    }

    // Instead of redirect, return success status
    return { success: true };

  } catch (error) {
    console.error("Sign-in error:", error);
    return { message: "An unexpected error occurred. Please try again later." };
  }
};