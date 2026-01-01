import { useCallback, useEffect, useState } from "react";

import { getPaperById } from "@/api/paper";
import { type ResearchPaper } from "@/types";
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

  const fetchPaper = useCallback(async (): Promise<void> => {
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
  }, [id]);

  useEffect(() => {
    void fetchPaper();
  }, [fetchPaper]);

  return {
    paper,
    loading,
    error,
  };
};
