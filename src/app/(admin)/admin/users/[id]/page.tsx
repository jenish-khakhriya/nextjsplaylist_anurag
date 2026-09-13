"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { getErrorMessage } from "@/services/api";
import { User } from "@/types/user";
import { ROUTES, DEFAULT_AVATAR } from "@/utils/constants";
import AdminRoute from "@/components/auth/AdminRoute";
import AdminSidebar from "@/components/layout/Sidebar";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";

function UserDetailContent() {
  const params = useParams<{ id: string }>();
  console.log(params,"fff")
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getUserById(params.id);
        setUser(data);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load user."));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) return <Loader text="Loading user…" />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href={ROUTES.ADMIN_USERS}
          className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          ← Back to users
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
      </div>

      <div className="flex gap-8">
        <AdminSidebar />

        <div className="flex-1 min-w-0">
          <ErrorMessage message={error} />

          {user && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm max-w-2xl">
              {/* Avatar & name */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-indigo-100">
                  <Image
                    src={
                      user.profileImage ||
                      `${DEFAULT_AVATAR}&name=${encodeURIComponent(user.name)}`
                    }
                    alt={user.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {user.role === "admin" ? "Administrator" : "User"}
                  </span>
                </div>
              </div>

              {/* Fields */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "User ID", value: user.id },
                  { label: "Role", value: user.role },
                  { label: "Email", value: user.email },
                  {
                    label: "Member Since",
                    value: new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                  },
                  {
                    label: "Last Updated",
                    value: new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                  },
                ].map((field) => (
                  <div key={field.label} className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {field.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900 break-all">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Note: password and salt are never displayed — excluded by backend */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminUserDetailPage() {
  return (
    <AdminRoute>
      <UserDetailContent />
    </AdminRoute>
  );
}
