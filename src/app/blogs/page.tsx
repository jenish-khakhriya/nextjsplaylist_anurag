import { Metadata } from "next";
import { blogService } from "@/services/blog.service";
import BlogList from "@/components/blog/BlogList";
import { Blog } from "@/types/blog";

export const metadata: Metadata = { title: "Blogs" };

async function getBlogs(): Promise<Blog[]> {
  try {
    return await blogService.getBlogs();
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
        <p className="mt-2 text-gray-500">
          Discover stories, ideas, and perspectives from our community.
        </p>
      </div>
      <BlogList initialBlogs={blogs} />
    </div>
  );
}
