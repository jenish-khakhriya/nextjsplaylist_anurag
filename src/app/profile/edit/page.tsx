"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/user.service";
import { getErrorMessage } from "@/services/api";
import { updateProfileSchema } from "@/validation/user.validation";
import { ROUTES } from "@/utils/constants";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";

function EditProfileContent() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      profileImage: user?.profileImage ?? "",
    },
    validationSchema: updateProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setApiError(null);
      try {
        await userService.updateProfile({
          name: values.name,
          email: values.email,
          ...(values.profileImage ? { profileImage: values.profileImage } : {}),
        });
        await refreshUser();
        setSuccess(true);
        setTimeout(() => router.push(ROUTES.PROFILE), 1500);
      } catch (err) {
        setApiError(getErrorMessage(err, "Failed to update profile."));
      }
    },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href={ROUTES.PROFILE}
          className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          ← Back to profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Profile updated successfully! Redirecting…
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
          <ErrorMessage message={apiError} />

          <Input
            id="name"
            label="Full name"
            placeholder="John Doe"
            {...formik.getFieldProps("name")}
            error={formik.errors.name}
            touched={formik.touched.name}
          />

          <Input
            id="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            {...formik.getFieldProps("email")}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <Input
            id="profileImage"
            label="Profile image URL (optional)"
            placeholder="https://example.com/avatar.jpg"
            {...formik.getFieldProps("profileImage")}
            error={formik.errors.profileImage}
            touched={formik.touched.profileImage}
          />

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <Button
              type="submit"
              fullWidth
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Save Changes
            </Button>
            <Link href={ROUTES.PROFILE} className="flex-1">
              <Button variant="secondary" fullWidth type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <ProtectedRoute>
      <EditProfileContent />
    </ProtectedRoute>
  );
}
