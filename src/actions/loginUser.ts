"use server";

import { signIn } from "@/auth";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}
