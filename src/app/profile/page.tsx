"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES, DEFAULT_AVATAR } from "@/utils/constants";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/common/Button";

function ProfileContent() {
  const { user } = useAuth();
  if (!user) return null;

  const avatar =
    user.profileImage ||
    `${DEFAULT_AVATAR}&name=${encodeURIComponent(user.name)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-indigo-100">
            <Image
              src={avatar}
              alt={user.name}
              fill
              sizes="96px"
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `${DEFAULT_AVATAR}&name=${encodeURIComponent(user.name)}`;
              }}
            />
          </div>
          <div className="text-center sm:text-left">
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

        {/* Details */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Full Name</p>
            <p className="mt-1 font-medium text-gray-900">{user.name}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</p>
            <p className="mt-1 font-medium text-gray-900">{user.email}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Role</p>
            <p className="mt-1 font-medium text-gray-900 capitalize">{user.role}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Member Since</p>
            <p className="mt-1 font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={ROUTES.PROFILE_EDIT} className="flex-1">
            <Button variant="primary" fullWidth>
              Edit Profile
            </Button>
          </Link>
          <Link href={ROUTES.PROFILE_CHANGE_PASSWORD} className="flex-1">
            <Button variant="secondary" fullWidth>
              Change Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
