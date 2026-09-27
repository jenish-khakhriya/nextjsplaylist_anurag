import { getProfileType } from "@/types/user";
import { createClientApi } from "./api";
import { url } from "@/constant/api";

export const getCurrentUser = async (): Promise<getProfileType> => {
  const api = await createClientApi();

  const response: getProfileType =
    await api.get(url.ME);

  return response;
};