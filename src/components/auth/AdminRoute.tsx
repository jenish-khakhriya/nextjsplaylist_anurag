"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import Loader from "@/components/common/Loader";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps pages that require an admin role.
 * Redirects unauthenticated users to /login and non-admins to /unauthorized.
 * The backend also enforces checkAdmin middleware – this guard is UI-only.
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    } else if (user?.role !== "admin") {
      router.replace(ROUTES.UNAUTHORIZED);
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) return <Loader fullPage text="Checking permissions…" />;
  if (!isAuthenticated || user?.role !== "admin") return null;

  return <>{children}</>;
}
