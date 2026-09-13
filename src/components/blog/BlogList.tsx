"use client";

import { useState } from "react";
import { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";
import EmptyState from "@/components/common/EmptyState";
import { ROUTES } from "@/utils/constants";

interface BlogListProps {
  initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const handleDeleted = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  if (blogs.length === 0) {
    return (
      <EmptyState
        title="No blogs found"
        description="Be the first to share something great!"
        actionLabel="Create Blog"
        actionHref={ROUTES.BLOG_CREATE}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} onDeleted={handleDeleted} />
      ))}
    </div>
  );
}
