"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { userService } from "@/services/user.service";
import { getErrorMessage } from "@/services/api";
import { changePasswordSchema } from "@/validation/user.validation";
import { ROUTES } from "@/utils/constants";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";

function ChangePasswordContent() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      setApiError(null);
      try {
        await userService.changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        setSuccess(true);
        setTimeout(() => router.push(ROUTES.PROFILE), 2000);
      } catch (err) {
        setApiError(getErrorMessage(err, "Failed to change password. Check your current password."));
      }
    },
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href={ROUTES.PROFILE}
          className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          ← Back to profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 text-center">
            Password changed successfully! Redirecting…
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
            <ErrorMessage message={apiError} />

            <Input
              id="oldPassword"
              type="password"
              label="Current password"
              placeholder="Enter your current password"
              autoComplete="current-password"
              {...formik.getFieldProps("oldPassword")}
              error={formik.errors.oldPassword}
              touched={formik.touched.oldPassword}
            />

            <Input
              id="newPassword"
              type="password"
              label="New password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              {...formik.getFieldProps("newPassword")}
              error={formik.errors.newPassword}
              touched={formik.touched.newPassword}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm new password"
              placeholder="Repeat new password"
              autoComplete="new-password"
              {...formik.getFieldProps("confirmPassword")}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
            />

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Button
                type="submit"
                fullWidth
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
              >
                Change Password
              </Button>
              <Link href={ROUTES.PROFILE} className="flex-1">
                <Button variant="secondary" fullWidth type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <ProtectedRoute>
      <ChangePasswordContent />
    </ProtectedRoute>
  );
}
