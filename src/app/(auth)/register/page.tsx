"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/validation/auth.validation";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/constants";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function RegisterPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(ROUTES.BLOGS);
    }
  }, [loading, isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setApiError(null);
      try {
        await authService.register({
          name: values.name,
          email: values.email,
          password: values.password,
          ...(values.profileImage ? { profileImage: values.profileImage } : {}),
        });
        setSuccess(true);
        setTimeout(() => router.push(ROUTES.LOGIN), 2000);
      } catch (err) {
        setApiError(getErrorMessage(err, "Registration failed. Please try again."));
      }
    },
  });

  if (loading || isAuthenticated) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-2 text-sm text-gray-500">
              Join BlogApp and start writing today
            </p>
          </div>

          {success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
              Account created! Redirecting to login…
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
              <ErrorMessage message={apiError} />

              <Input
                id="name"
                label="Full name"
                placeholder="John Doe"
                autoComplete="name"
                {...formik.getFieldProps("name")}
                error={formik.errors.name}
                touched={formik.touched.name}
              />

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
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
                error={formik.errors.password}
                touched={formik.touched.password}
              />

              <Input
                id="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                {...formik.getFieldProps("confirmPassword")}
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
              />

              <Input
                id="profileImage"
                label="Profile image URL (optional)"
                placeholder="https://example.com/avatar.jpg"
                {...formik.getFieldProps("profileImage")}
                error={formik.errors.profileImage}
                touched={formik.touched.profileImage}
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                className="mt-2"
              >
                Create account
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
