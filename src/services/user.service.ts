import api from "./api";
import { User, UpdateProfilePayload, ChangePasswordPayload } from "@/types/user";

export const userService = {
  async getMe(): Promise<User> {
    const res = await api.get<{ success: boolean; data: User }>("/users/me");
    return res.data.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    const res = await api.patch<{ success: boolean; data: User }>("/users/me", payload);
    return res.data.data;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await api.patch("/users/change-password", payload);
  },
};
