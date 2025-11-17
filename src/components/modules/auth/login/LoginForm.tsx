"use client";

import Logo from '@/app/assets/svgs/Logo';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
     const form = useForm();

      const onSubmit = (data: any) => {
        console.log(data);
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
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <Button type="submit" className="mt-5 w-full">
              Sign In
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