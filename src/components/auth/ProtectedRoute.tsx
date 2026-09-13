"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";
import Loader from "@/components/common/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps pages that require an authenticated user.
 * While the session check is in-flight it shows a loader.
 * Once resolved, unauthenticated visitors are redirected to /login.
 * The actual authorization is enforced by the backend; this guard
 * is only for navigation UX.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Loader fullPage text="Checking session…" />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
