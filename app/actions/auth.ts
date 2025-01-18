'use server'

import { signIn } from "@/auth"
import { signOut } from '@/auth'

export async function startGoogleSignIn() {
  await signIn("google", { redirectTo: "/dashboard"})
}

export async function startGithubSignIn() {
  await signIn("github", { redirectTo: "/dashboard"})
}


export async function handleSignOut() {
  await signOut({ redirectTo: '/login' });
}