"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES, DEFAULT_AVATAR } from "@/utils/constants";
import { getErrorMessage } from "@/services/api";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      router.push(ROUTES.LOGIN);
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (href: string) =>
    pathname === href
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-indigo-600";

  const avatarSrc = user?.profileImage || `${DEFAULT_AVATAR}&name=${encodeURIComponent(user?.name ?? "U")}`;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600">BlogApp</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href={ROUTES.HOME} className={isActive(ROUTES.HOME)}>Home</Link>
          <Link href={ROUTES.BLOGS} className={isActive(ROUTES.BLOGS)}>Blogs</Link>

          {isAuthenticated && (
            <Link href={ROUTES.BLOG_CREATE} className={isActive(ROUTES.BLOG_CREATE)}>
              Create Blog
            </Link>
          )}

          {user?.role === "admin" && (
            <Link href={ROUTES.ADMIN} className={isActive(ROUTES.ADMIN)}>
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop right section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href={ROUTES.PROFILE} className="flex items-center gap-2 group">
                <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-indigo-100 group-hover:ring-indigo-400 transition-all">
                  <Image
                    src={avatarSrc}
                    alt={user?.name ?? "Profile"}
                    fill
                    sizes="32px"
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `${DEFAULT_AVATAR}&name=${encodeURIComponent(user?.name ?? "U")}`;
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                  {user?.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loggingOut ? "Logging out…" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.LOGIN}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href={ROUTES.REGISTER}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <MobileLink href={ROUTES.HOME} label="Home" active={pathname === ROUTES.HOME} onClick={() => setMobileOpen(false)} />
            <MobileLink href={ROUTES.BLOGS} label="Blogs" active={pathname === ROUTES.BLOGS} onClick={() => setMobileOpen(false)} />

            {isAuthenticated && (
              <MobileLink href={ROUTES.BLOG_CREATE} label="Create Blog" active={pathname === ROUTES.BLOG_CREATE} onClick={() => setMobileOpen(false)} />
            )}

            {user?.role === "admin" && (
              <MobileLink href={ROUTES.ADMIN} label="Admin Dashboard" active={pathname === ROUTES.ADMIN} onClick={() => setMobileOpen(false)} />
            )}

            {isAuthenticated ? (
              <>
                <MobileLink href={ROUTES.PROFILE} label="Profile" active={pathname === ROUTES.PROFILE} onClick={() => setMobileOpen(false)} />
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="mt-2 w-full rounded-lg border border-red-300 py-2 text-center text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href={ROUTES.LOGIN}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-gray-300 py-2 text-center text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-indigo-600 py-2 text-center text-sm text-white hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 transition-colors ${
        active ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}
