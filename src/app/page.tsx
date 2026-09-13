import Link from "next/link";
import Image from "next/image";
import { blogService } from "@/services/blog.service";
import { ROUTES, DEFAULT_BLOG_IMAGE, DEFAULT_AVATAR } from "@/utils/constants";
import { Blog } from "@/types/blog";

async function getLatestBlogs(): Promise<Blog[]> {
  try {
    const blogs = await blogService.getBlogs();
    return blogs.slice(0, 3);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const latestBlogs = await getLatestBlogs();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 px-4 py-24 text-white sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-6">
            Welcome to BlogApp
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Share Your Ideas With{" "}
            <span className="text-yellow-300">The World</span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            A modern platform where writers share stories, knowledge, and
            perspectives. Create, discover, and engage with blogs that matter.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.REGISTER}
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-indigo-50 transition-colors"
            >
              Get started — it&apos;s free
            </Link>
            <Link
              href={ROUTES.BLOGS}
              className="w-full sm:w-auto rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              Browse blogs →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to blog
            </h2>
            <p className="mt-3 text-gray-500">
              Simple, powerful tools for writers and readers alike.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
              >
                <div className="mb-4 text-3xl">{f.icon}</div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      {latestBlogs.length > 0 && (
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Latest Blogs</h2>
                <p className="mt-1 text-gray-500">Fresh perspectives from our writers</p>
              </div>
              <Link
                href={ROUTES.BLOGS}
                className="hidden sm:inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((blog) => (
                <HomeBlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href={ROUTES.BLOGS}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View all blogs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-indigo-600 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Ready to start writing?</h2>
          <p className="mt-4 text-indigo-100">
            Join thousands of writers and share your story today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={ROUTES.REGISTER}
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
            >
              Create an account
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeBlogCard({ blog }: { blog: Blog }) {
  const blogImage = blog.image || DEFAULT_BLOG_IMAGE;
  const authorAvatar =
    blog.author?.profileImage ||
    `${DEFAULT_AVATAR}&name=${encodeURIComponent(blog.author?.name ?? "A")}`;

  return (
    <Link
      href={ROUTES.BLOG_DETAIL(blog._id)}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image
          src={blogImage}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {blog.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{blog.content}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full shrink-0">
            <Image
              src={authorAvatar}
              alt={blog.author?.name ?? "Author"}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="text-xs text-gray-600">{blog.author?.name}</span>
          <span className="ml-auto text-xs text-gray-400">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

const features = [
  {
    icon: "✍️",
    title: "Write & Publish",
    description:
      "Create beautiful blogs with a simple editor and publish them instantly to the world.",
  },
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Your account is protected with secure HTTP-only cookie authentication.",
  },
  {
    icon: "👤",
    title: "Manage Your Profile",
    description:
      "Personalise your profile with an avatar and keep your information up to date.",
  },
  {
    icon: "📸",
    title: "Rich Blog Images",
    description:
      "Add cover images to make your blogs visually compelling and engaging.",
  },
  {
    icon: "🛡️",
    title: "Admin Controls",
    description:
      "Admins can manage all users and blogs, keeping the platform safe and clean.",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    description:
      "A seamless reading and writing experience on any device — mobile, tablet, or desktop.",
  },
];
