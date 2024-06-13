"use server";

import { z } from "zod";
import { formSchema } from "../admin-login/page";
import { signIn, signOut } from "@/auth";

export const server_signIn = async (values: z.infer<typeof formSchema>) => {
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
