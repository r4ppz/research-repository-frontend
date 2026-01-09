import { axiosClient } from "@/api/axiosClient";
import type { Department } from "@/types";

interface YearsResponse {
  years: number[];
}

interface DepartmentsResponse {
  departments: Department[];
}

export const getYears = async (): Promise<number[]> => {
  const response = await axiosClient.get<YearsResponse>("/api/filters/years");
  return response.data.years;
};

export const getDepartments = async (): Promise<Department[]> => {
  const response = await axiosClient.get<DepartmentsResponse>("/api/filters/departments");
  return response.data.departments;
};
