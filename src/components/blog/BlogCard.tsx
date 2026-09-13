"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "@/types/blog";
import { useAuth } from "@/hooks/useAuth";
import { blogService } from "@/services/blog.service";
import { getErrorMessage } from "@/services/api";
import { ROUTES, DEFAULT_AVATAR, DEFAULT_BLOG_IMAGE } from "@/utils/constants";
import Modal from "@/components/common/Modal";

interface BlogCardProps {
  blog: Blog;
  onDeleted?: (id: string) => void;
}

export default function BlogCard({ blog, onDeleted }: BlogCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const canEdit =
    user && (user._id === blog.author?._id || user.role === "admin");

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await blogService.deleteBlog(blog._id);
      setShowModal(false);
      onDeleted?.(blog._id);
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const authorAvatar =
    blog.author?.profileImage ||
    `${DEFAULT_AVATAR}&name=${encodeURIComponent(blog.author?.name ?? "A")}`;

  const blogImage = blog.image || DEFAULT_BLOG_IMAGE;

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Cover image */}
        <Link href={ROUTES.BLOG_DETAIL(blog._id)} className="relative block h-48 overflow-hidden bg-gray-100">
          <Image
            src={blogImage}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_BLOG_IMAGE;
            }}
          />
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <Link href={ROUTES.BLOG_DETAIL(blog._id)}>
            <h2 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
              {blog.title}
            </h2>
          </Link>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">{blog.content}</p>

          {/* Author row */}
          <div className="mt-4 flex items-center gap-2">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src={authorAvatar}
                alt={blog.author?.name ?? "Author"}
                fill
                sizes="28px"
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `${DEFAULT_AVATAR}&name=${encodeURIComponent(blog.author?.name ?? "A")}`;
                }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{blog.author?.name}</span>
            <span className="ml-auto text-xs text-gray-400">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <Link
              href={ROUTES.BLOG_DETAIL(blog._id)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Read more →
            </Link>
            {canEdit && (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(ROUTES.BLOG_EDIT(blog._id))}
                  className="rounded-md px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-md px-3 py-1 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      <Modal
        isOpen={showModal}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
