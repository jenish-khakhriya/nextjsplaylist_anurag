"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin.service";
import { getErrorMessage } from "@/services/api";
import { User } from "@/types/user";
import { ROUTES, DEFAULT_AVATAR } from "@/utils/constants";
import AdminRoute from "@/components/auth/AdminRoute";
import AdminSidebar from "@/components/layout/Sidebar";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

function AdminUsersContent() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Role change state
  const [roleTarget, setRoleTarget] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<"user" | "admin">("user");
  const [changingRole, setChangingRole] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load users."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await adminService.deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete user."));
    } finally {
      setDeleting(false);
    }
  };

  const openRoleModal = (user: User) => {
    setRoleTarget(user);
    setNewRole(user.role === "admin" ? "user" : "admin");
  };

  const handleRoleChange = async () => {
    if (!roleTarget) return;
    try {
      setChangingRole(true);
      await adminService.changeUserRole(roleTarget.id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === roleTarget.id ? { ...u, role: newRole } : u))
      );
      setRoleTarget(null);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to change role."));
    } finally {
      setChangingRole(false);
    }
  };

  if (loading) return <Loader text="Loading users…" />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <p className="mt-2 text-gray-500">{users.length} total users</p>
      </div>

      <div className="flex gap-8">
        <AdminSidebar />

        <div className="flex-1 min-w-0">
          <ErrorMessage message={error} />

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["User", "Email", "Role", "Joined", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  console.log(u,"ggg")
                  const avatar =
                    u.profileImage ||
                    `${DEFAULT_AVATAR}&name=${encodeURIComponent(u.name)}`;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                            <Image src={avatar} alt={u.name} fill sizes="32px" className="object-cover" />
                          </div>
                          <span className="font-medium text-gray-900 whitespace-nowrap">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{u.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(ROUTES.ADMIN_USER_DETAIL(u.id))}
                            className="rounded px-2.5 py-1 text-xs font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openRoleModal(u)}
                            className="rounded px-2.5 py-1 text-xs font-medium text-amber-600 border border-amber-200 hover:bg-amber-50 transition-colors cursor-pointer"
                          >
                            Role
                          </button>
                          <button
                            onClick={() => setDeleteTarget(u)}
                            className="rounded px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="py-16 text-center text-gray-400">No users found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Role change modal */}
      {roleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRoleTarget(null)} />
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-gray-900">Change Role</h2>
            <p className="mt-2 text-sm text-gray-600">
              Change role for <strong>{roleTarget.name}</strong>
            </p>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">New Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as "user" | "admin")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setRoleTarget(null)} disabled={changingRole}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRoleChange} loading={changingRole}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <AdminRoute>
      <AdminUsersContent />
    </AdminRoute>
  );
}
