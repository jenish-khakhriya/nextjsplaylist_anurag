import axios, { AxiosError } from "axios";

// Create axios instance with withCredentials: true so the browser
// automatically sends the HTTP-only JWT cookie on every request.
// The JWT is NEVER accessed from JavaScript – the cookie is opaque to the frontend.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: on 401, clear auth state and redirect to /login.
// The redirect is done via window.location to avoid needing the router here.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login") &&
      !window.location.pathname.startsWith("/register")
    ) {
      // Dispatch a custom event so AuthContext can clear the user state
      window.dispatchEvent(new Event("auth:unauthorized"));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/** Extract the error message from an Axios error, falling back to a default. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string })?.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export default api;
