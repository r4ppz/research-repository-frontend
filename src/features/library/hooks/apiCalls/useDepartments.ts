import { useEffect, useState } from "react";
import { Department } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";
import { getDepartments } from "../../api/filter";

interface UseDepartmentsReturn {
  departments: Department[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDepartments = (): UseDepartmentsReturn => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    void fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    error,
    refetch: fetchDepartments,
  };
};
