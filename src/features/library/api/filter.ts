import { axiosClient } from "@/api/axiosClient";

export const getYears = async (): Promise<number[]> => {
  const response = await axiosClient.get<number[]>("/api/filters/years");
  return response.data;
};

export const getDepartments = async (): Promise<
  { departmentid: number; departmentname: string }[]
> => {
  const response = await axiosClient.get<{ departmentid: number; departmentname: string }[]>(
    "/api/filters/departments",
  );
  return response.data;
};
