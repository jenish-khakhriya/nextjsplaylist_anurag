import Link from "next/link";
import Image from "next/image";
import { HeaderProps } from "@/types/user";



const Header = ({ user }: HeaderProps) => {
  const isAdmin = user?.role?.includes("admin");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Chat<span className="text-blue-500">App</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {user && <Link
            href="/"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Dashboard
          </Link>}

          

          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Right side */}
        {!user ? (
          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium hover:bg-zinc-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500"
            >
              Sign Up
            </Link>

          </div>
        ) : (
          <div className="group relative">

            {/* Profile */}
            <div className="flex cursor-pointer items-center gap-3">

              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-zinc-700">

                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-600 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}

              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">
                  {user.username}
                </p>

                <p className="text-xs text-zinc-500">
                  {isAdmin ? "Administrator" : "User"}
                </p>
              </div>

              <span className="text-zinc-500">
                ▼
              </span>

            </div>

            {/* Dropdown */}
            <div className="invisible absolute right-0 top-full mt-3 w-72 translate-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

              {/* User information */}
              <div className="border-b border-zinc-800 p-4">

                <div className="flex items-center gap-3">

                  <div className="relative h-12 w-12 overflow-hidden rounded-full">

                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.username}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-600 font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}

                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {user.username}
                    </p>

                    <p className="truncate text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>

                </div>

              </div>

              {/* Menu */}
              <div className="p-2">

                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  👤
                  Profile
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  📊
                  Dashboard
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-blue-400 hover:bg-zinc-900"
                  >
                    ⚡
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  href="/settings"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
                >
                  ⚙️
                  Settings
                </Link>

              </div>

              {/* Logout */}
              <div className="border-t border-zinc-800 p-2">

                <Link
                  href="/logout"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                >
                  ↪
                  Logout
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </header>
  );
};

export default Header;