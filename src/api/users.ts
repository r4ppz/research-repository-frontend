import { axiosClient } from "@/api/axiosClient";
import { User } from "@/types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosClient.get<User>("/api/users/me");
  return response.data;
};
