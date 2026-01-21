import { useEffect, useState } from "react";
import { getDepartments } from "@/api/filter";
import type { Department } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

interface UseDepartmentsReturn {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

export const useDepartments = (): UseDepartmentsReturn => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const result = await getDepartments();
        setDepartments(result);
      } catch (err) {
        const apiError = extractApiError(err);
        setError(getUserErrorMessage(apiError));
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    error,
  };
};
