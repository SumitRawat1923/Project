"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { server_signIn } from "@/app/actions/index";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z.string().min(8).max(30),
  password: z.string().min(8).max(20),
});

function AdminLoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      await server_signIn(values);
      router.replace("/");
    } catch (e: any) {
      toast({
        title: "Invalid credentials !",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="md:max-w-lg w-full  p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-8"
          >
            <h1 className="text-xl sm:text-2xl  md:text-4xl text-center">
              Login-Form
            </h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
