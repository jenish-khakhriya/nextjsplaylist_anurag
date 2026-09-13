import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogService } from "@/services/blog.service";
import { ROUTES, DEFAULT_BLOG_IMAGE, DEFAULT_AVATAR } from "@/utils/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const blog = await blogService.getBlogById(id);
    return { title: blog.title };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;

  let blog;
  try {
    blog = await blogService.getBlogById(id);
  } catch {
    notFound();
  }

  const blogImage = blog.image || DEFAULT_BLOG_IMAGE;
  const authorAvatar =
    blog.author?.profileImage ||
    `${DEFAULT_AVATAR}&name=${encodeURIComponent(blog.author?.name ?? "A")}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href={ROUTES.BLOGS}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        ← Back to blogs
      </Link>

      {/* Cover image */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-80">
        <Image
          src={blogImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          preload={true}
        />
      </div>

      {/* Header */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
          {blog.title}
        </h1>

        {/* Author info */}
        <div className="mt-6 flex items-center gap-3 border-y border-gray-100 py-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={authorAvatar}
              alt={blog.author?.name ?? "Author"}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {blog.author?.name}
            </p>
            <p className="text-xs text-gray-500">{blog.author?.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-400">
              Published {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {blog.updatedAt !== blog.createdAt && (
              <p className="text-xs text-gray-400">
                Updated {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 prose prose-gray max-w-none">
        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
