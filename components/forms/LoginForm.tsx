"use client"

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import handleAxios from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";

interface LoginValues {
  identifier: string;
  password: string;
}

const initialValues: LoginValues = {
  identifier: "",
  password: "",
};

const validationSchema = Yup.object({
  identifier: Yup.string()
    .trim()
    .required("Username or email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [loading,setLoading] = useState(false);
  const handleSubmit = async (
    values: LoginValues
  ) => {
    console.log("LOGIN DATA:", values);

       try {
      setLoading(true);
      const api = await handleAxios();

      const response = await api.post(
        "/api/auth/login",
        {
          email : values.identifier,
          password : values.password
        }
      );
      console.log(response.data)
      const { token, refreshToken } = response.data;

await fetch("/api/set-cookie", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    refreshToken,
  }),
});
      toast.success("its success")
    }
    catch (err) {
      if (err instanceof Error)
        toast.error(err.message)
    }
    finally {
      setLoading(false);
    }
    /*
    const response = await axios.post(
      "/api/login",
      values
    );

    console.log(response.data);
    */
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-black px-4 py-12 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-150px] top-1/3 h-[450px] w-[450px] rounded-full bg-pink-600/10 blur-[140px]" />

      {/* Card */}
      <div className="relative w-full max-w-md">

        {/* Gradient border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm" />

        <div className="relative rounded-3xl border border-white/10 bg-zinc-950/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">

              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect
                  width="18"
                  height="11"
                  x="3"
                  y="10"
                  rx="2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 10V7a5 5 0 0 1 10 0v3"
                />
              </svg>

            </div>

            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Sign in to continue to your account.
            </p>

          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                {/* Identifier */}
                <div>

                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Username or Email
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 transition group-focus-within:text-purple-400">

                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 21a8 8 0 0 1 16 0"
                        />
                      </svg>

                    </div>

                    <Field
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      placeholder="Username or email"
                      className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-12 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                    />

                  </div>

                  <ErrorMessage
                    name="identifier"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />

                </div>

                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-purple-400 hover:text-purple-300"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1.5 text-xs text-red-400"
                  />

                </div>

                {/* Remember me */}
                <div className="flex items-center gap-3">

                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-purple-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-zinc-500"
                  >
                    Remember me
                  </label>

                </div>

                {/* Login */}
                {loading ? <div className="w-full flex justify-center item-center rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-[1.01] hover:shadow-purple-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                  <div className="w-5 h-5 border-t-white border-x-transparent animate-spin border-[3px] rounded-full "></div>
                </div> : <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-[1.01] hover:shadow-purple-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "Signing in..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In

                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m-6-6 6 6-6 6"
                        />
                      </svg>
                    </span>
                  )}
                </button>}

              </Form>
            )}
          </Formik>

          {/* Signup */}
          <div className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-purple-400 hover:text-purple-300"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;