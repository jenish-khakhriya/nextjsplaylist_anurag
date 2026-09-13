"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { blogService } from "@/services/blog.service";
import { getErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/constants";
import { CreateBlogPayload } from "@/types/blog";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BlogForm from "@/components/blog/BlogForm";

function CreateBlogContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: CreateBlogPayload) => {
    setError(null);
    try {
      // Do NOT include author — backend sets it from the authenticated cookie
      const blog = await blogService.createBlog(values);
      router.push(ROUTES.BLOG_DETAIL(blog._id));
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create blog. Please try again."));
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create a Blog</h1>
        <p className="mt-2 text-gray-500">
          Writing as <span className="font-medium text-indigo-600">{user?.name}</span>
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <BlogForm
          onSubmit={handleSubmit}
          submitLabel="Publish Blog"
          error={error}
        />
      </div>
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <CreateBlogContent />
    </ProtectedRoute>
  );
}
