// components/skeleton/HeaderShimmer.tsx

import { static_url } from "@/constant/api";
import Link from "next/link";

const HeaderShimmer = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
          <Link
          href={static_url.HOME}
          className="text-2xl font-bold tracking-tight"
        >
          Chat<span className="text-blue-500">App</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href={static_url.DASHBOARD}
            className="text-sm text-zinc-300 hover:text-white"
          >
            Dashboard
          </Link>

          <div className="h-4 w-16 overflow-hidden rounded bg-zinc-800">
            <div className="h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="h-11 w-11 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
          </div>

          {/* Username */}
          <div className="hidden space-y-2 sm:block">
            <div className="h-3 w-20 overflow-hidden rounded bg-zinc-800">
              <div className="h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
            </div>

            <div className="h-2 w-14 overflow-hidden rounded bg-zinc-800">
              <div className="h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HeaderShimmer;