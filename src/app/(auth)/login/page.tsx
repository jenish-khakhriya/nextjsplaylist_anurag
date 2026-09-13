"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/validation/auth.validation";
import { getErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/constants";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useState } from "react";

export default function LoginPage() {
  const { login, isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(user?.role === "admin" ? ROUTES.ADMIN : ROUTES.BLOGS);
    }
  }, [loading, isAuthenticated, user, router]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setApiError(null);
      try {
        await login(values);
        // Navigation handled by useEffect above after user is set
      } catch (err) {
        setApiError(getErrorMessage(err, "Invalid email or password"));
      }
    },
  });

  if (loading || isAuthenticated) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your BlogApp account
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
            <ErrorMessage message={apiError} />

            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              error={formik.errors.email}
              touched={formik.touched.email}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              error={formik.errors.password}
              touched={formik.touched.password}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              className="mt-2"
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.REGISTER}
              className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
