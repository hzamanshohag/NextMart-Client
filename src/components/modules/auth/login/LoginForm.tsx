"use client";

import ReCAPTCHA from "react-google-recaptcha";
import Logo from "@/app/assets/svgs/Logo";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginValidation } from "./loginValidation";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });

  const [reCaptchaStatus, setReCaptchaStatus] = React.useState<boolean>(false);

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res.success) {
        toast.success("ReCAPTCHA verification successful!");
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      toast.error(
        err.message || "ReCAPTCHA verification failed. Please try again."
      );
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res.message || "User login successful!");
        form.reset();
      } else {
        toast.error(res.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Sign In</h1>
          <p className="font-extralight text-sm text-gray-600">
            Enter your phone number to sign in.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center mt-3.5 w-full mx-auto">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_SITE_KEY || ""}
              onChange={handleReCaptcha}
              className="mx-auto"
            />
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={reCaptchaStatus ? false : true}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Don't have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
