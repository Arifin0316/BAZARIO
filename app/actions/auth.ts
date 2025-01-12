'use server'

import { signIn } from "@/auth"

export async function startGoogleSignIn() {
  await signIn("google", { redirectTo: "/dashboard"})
}

export async function startGithubSignIn() {
  await signIn("github", { redirectTo: "/dashboard"})
}