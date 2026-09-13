import Link from "next/link";
import { ROUTES } from "@/utils/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href={ROUTES.HOME} className="text-lg font-bold text-indigo-600">
            BlogApp
          </Link>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href={ROUTES.HOME} className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link href={ROUTES.BLOGS} className="hover:text-indigo-600 transition-colors">Blogs</Link>
            <Link href={ROUTES.LOGIN} className="hover:text-indigo-600 transition-colors">Login</Link>
            <Link href={ROUTES.REGISTER} className="hover:text-indigo-600 transition-colors">Register</Link>
          </nav>
          <p className="text-sm text-gray-400">&copy; {year} BlogApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
