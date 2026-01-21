import { useEffect, useState } from "react";
import { getPaperById } from "@/api/paper";
import type { ResearchPaper } from "@/types";
import { extractApiError, getUserErrorMessage } from "@/util/errorHandler";

interface UsePaperByIdReturn {
  paper: ResearchPaper | null;
  loading: boolean;
  error: string | null;
}

export const usePaperById = (id: number | null): UsePaperByIdReturn => {
  const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaper = async (): Promise<void> => {
      if (id === null) {
        setPaper(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await getPaperById(id);
        setPaper(result);
      } catch (err) {
        const apiError = extractApiError(err);
        setError(getUserErrorMessage(apiError));
        setPaper(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchPaper();
  }, [id]);

  return {
    paper,
    loading,
    error,
  };
};
