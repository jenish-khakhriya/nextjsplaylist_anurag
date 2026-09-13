"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";

const adminLinks = [
  { href: ROUTES.ADMIN, label: "Dashboard", icon: "📊" },
  { href: ROUTES.ADMIN_USERS, label: "Manage Users", icon: "👥" },
  { href: ROUTES.BLOGS, label: "All Blogs", icon: "📝" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0">
      <nav className="flex flex-col gap-1">
        {adminLinks.map((link) => {
          const active =
            link.href === ROUTES.ADMIN
              ? pathname === ROUTES.ADMIN
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
