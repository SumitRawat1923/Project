"use server";
import { signIn, signOut } from "@/auth";

export const server_signIn = async (values: any) => {
  const response = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });
  return response;
};

export const server_logout = async () => {
  await signOut();
};
