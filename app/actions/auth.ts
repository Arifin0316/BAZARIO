'use server'

import { signIn } from "@/auth"

export async function startGoogleSignIn() {
  await signIn("google", { redirectTo: "/dashboard"})
}