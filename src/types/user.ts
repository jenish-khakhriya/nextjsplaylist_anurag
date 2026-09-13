export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  profileImage?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
