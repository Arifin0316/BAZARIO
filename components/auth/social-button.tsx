'use client';
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";
import { startGoogleSignIn, startGithubSignIn } from "@/app/actions/auth";

export const GoogleButton = () => {
  return (
    <button 
      onClick={() => startGoogleSignIn()}
      className="flex items-center justify-center w-full p-2 space-x-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
    >
      <IoLogoGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export const GihubButton = () => {
  return (
    <button 
      onClick={() => startGithubSignIn()}
      className="flex items-center justify-center w-full p-2 space-x-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
    >
      <IoLogoGithub />
      <span>Sign in with Github</span>
    </button>
  );
};