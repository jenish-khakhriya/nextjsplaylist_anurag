import Link from "next/link";
import { Metadata } from "next";
import { ROUTES } from "@/utils/constants";

export const metadata: Metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-6">🔒</div>
      <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
      <p className="mt-4 text-gray-500 max-w-sm">
        You don&apos;t have permission to view this page. If you think this is a
        mistake, contact an administrator.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href={ROUTES.HOME}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href={ROUTES.BLOGS}
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse Blogs
        </Link>
      </div>
    </div>
  );
}
