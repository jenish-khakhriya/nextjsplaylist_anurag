import api from "./api";
import { User } from "@/types/user";

export interface AdminStats {
  totalUsers: number;
  totalBlogs: number;
  adminUsers: number;
  normalUsers: number;
}

export const adminService = {
  async getUsers(): Promise<User[]> {
    const res = await api.get<{ success: boolean; data: User[] }>("/admin/users");
    return res.data.data;
  },

  async getUserById(id: string): Promise<User> {
    const res = await api.get<{ success: boolean; data: User }>(`/admin/users/${id}`);
    return res.data.data;
  },

  async changeUserRole(id: string, role: "user" | "admin"): Promise<User> {
    const res = await api.patch<{ success: boolean; data: User }>(
      `/admin/users/${id}/role`,
      { role }
    );
    return res.data.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },
};
