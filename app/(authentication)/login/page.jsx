"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login as loginFromAction } from "./actions";
import { useFormStatus } from "react-dom";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import { useTransition, useActionState } from 'react';

const Login = () => {
  const [state, action] = useActionState(loginFromAction, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
      if (state && !state.errors && !isPending) {
        toast.success("Successfully logged in!", { position: toast.POSITION.TOP_CENTER });
        router.push("/");
      }
  }, [state, isPending, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-medium">
            Scripts Hub
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow py-8 mx-4">
        <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <p className="text-gray-700 text-sm md:text-base mb-6">
            Access a wide range of scripts for automation and efficiency by
            signing into your account.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-black focus:border-black"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-black focus:border-black"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
            </div>
            <SubmitButton />
          </form>
          <p className="text-black mt-4 text-sm">
            Don't have an account?{" "}
            <span className="font-medium text-gray-500">Click Here.</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;

// Submit button
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <CustomButton
      size="medium"
      className="w-full"
      type="submit"
      isDisabled={pending}
    >
      {pending ? (
        <div className="flex items-center">
          <span>Loading...</span>{" "}
          <span className="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-gray-600 ml-2" />
        </div>
      ) : (
        "Login"
      )}
    </CustomButton>
  );
}