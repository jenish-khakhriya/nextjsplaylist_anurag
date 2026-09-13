import api from "./api";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { User } from "@/types/user";

export const authService = {
  async register(payload: RegisterPayload): Promise<void> {
    await api.post("/auth/register", payload);
  },

  async login(payload: LoginPayload): Promise<User> {
    const res = await api.post<{ success: boolean; data: User }>("/auth/login", payload);
    return res.data.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getCurrentUser(): Promise<User> {
    const res = await api.get<{ success: boolean; data: User }>("/users/me");
    return res.data.data;
  },
};
