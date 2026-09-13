"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminService } from "@/services/admin.service";
import { blogService } from "@/services/blog.service";
import { getErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/constants";
import AdminRoute from "@/components/auth/AdminRoute";
import AdminSidebar from "@/components/layout/Sidebar";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";

interface Stats {
  totalUsers: number;
  totalBlogs: number;
  adminUsers: number;
  normalUsers: number;
}

function AdminDashboardContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [users, blogs] = await Promise.all([
          adminService.getUsers(),
          blogService.getBlogs(),
        ]);
        setStats({
          totalUsers: users.length,
          totalBlogs: blogs.length,
          adminUsers: users.filter((u) => u.role === "admin").length,
          normalUsers: users.filter((u) => u.role === "user").length,
        });
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load dashboard data."));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader text="Loading dashboard…" />;

  const cards = stats
    ? [
        { label: "Total Users", value: stats.totalUsers, icon: "👥", color: "bg-blue-50 border-blue-200 text-blue-700" },
        { label: "Total Blogs", value: stats.totalBlogs, icon: "📝", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
        { label: "Admin Users", value: stats.adminUsers, icon: "🛡️", color: "bg-purple-50 border-purple-200 text-purple-700" },
        { label: "Regular Users", value: stats.normalUsers, icon: "🙋", color: "bg-green-50 border-green-200 text-green-700" },
      ]
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">Overview of your platform.</p>
      </div>

      <div className="flex gap-8">
        <AdminSidebar />

        <div className="flex-1 min-w-0">
          <ErrorMessage message={error} />

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.label}
                className={`rounded-xl border p-6 ${card.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="text-3xl font-bold">{card.value}</span>
                </div>
                <p className="mt-3 text-sm font-medium">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Link
              href={ROUTES.ADMIN_USERS}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-3">👥</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">
                Manage Users
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View, edit roles, and delete users.
              </p>
            </Link>

            <Link
              href={ROUTES.BLOGS}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">
                Manage Blogs
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View, edit, and delete any blog post.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <AdminDashboardContent />
    </AdminRoute>
  );
}
