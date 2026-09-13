export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BLOGS: "/blogs",
  BLOG_CREATE: "/blogs/create",
  BLOG_DETAIL: (id: string) => `/blogs/${id}`,
  BLOG_EDIT: (id: string) => `/blogs/edit/${id}`,
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  PROFILE_CHANGE_PASSWORD: "/profile/change-password",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
  UNAUTHORIZED: "/unauthorized",
} as const;

export const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true";
export const DEFAULT_BLOG_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=75";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;
