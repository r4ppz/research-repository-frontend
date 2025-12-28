import { useEffect, useState } from "react";
import { getYears } from "@/api/filter";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

interface UseYearsReturn {
  years: string[];
  loading: boolean;
  error: string | null;
}

export const useYears = (): UseYearsReturn => {
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYears = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await getYears();
      setYears(result.map(String));
    } catch (err) {
      const apiError = extractApiError(err);
      setError(getUserErrorMessage(apiError));
      setYears([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchYears();
  }, []);

  return {
    years,
    loading,
    error,
  };
};
