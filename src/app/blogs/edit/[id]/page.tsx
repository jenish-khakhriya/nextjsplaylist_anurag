"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { blogService } from "@/services/blog.service";
import { getErrorMessage } from "@/services/api";
import { ROUTES } from "@/utils/constants";
import { Blog, CreateBlogPayload } from "@/types/blog";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BlogForm from "@/components/blog/BlogForm";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";

function EditBlogContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await blogService.getBlogById(params.id);
        // Frontend ownership check (backend enforces this too)
        if (user && data.author._id !== user._id && user.role !== "admin") {
          router.replace(ROUTES.UNAUTHORIZED);
          return;
        }
        setBlog(data);
      } catch (err) {
        const msg = getErrorMessage(err);
        if (msg.toLowerCase().includes("403") || msg.toLowerCase().includes("unauthorized")) {
          router.replace(ROUTES.UNAUTHORIZED);
        } else {
          setLoadError(msg);
        }
      } finally {
        setLoading(false);
      }
    };
    if (user !== undefined) load();
  }, [params.id, user, router]);

  const handleSubmit = async (values: CreateBlogPayload) => {
    setSubmitError(null);
    try {
      await blogService.updateBlog(params.id, values);
      router.push(ROUTES.BLOG_DETAIL(params.id));
    } catch (err) {
      const msg = getErrorMessage(err, "Failed to update blog.");
      if (msg.toLowerCase().includes("403")) {
        router.replace(ROUTES.UNAUTHORIZED);
      } else {
        setSubmitError(msg);
      }
    }
  };

  if (loading) return <Loader text="Loading blog…" />;
  if (loadError) return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <ErrorMessage message={loadError} />
    </div>
  );
  if (!blog) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
        <p className="mt-2 text-sm text-gray-500">Update your blog post below.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <BlogForm
          initialValues={{
            title: blog.title,
            content: blog.content,
            image: blog.image ?? "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          error={submitError}
        />
      </div>
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <ProtectedRoute>
      <EditBlogContent />
    </ProtectedRoute>
  );
}
