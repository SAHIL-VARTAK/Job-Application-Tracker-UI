import { useCallback, useEffect, useState } from "react";

import applicationService from "@/services/applicationService";
import type { ApiError } from "@/types/api";
import type { ApplicationStatistics } from "@/types/application";

export function useStatistics() {
    const [statistics, setStatistics] =
        useState<ApplicationStatistics | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<ApiError | null>(null);

    const fetchStatistics = useCallback(async () => {
        try {
            setLoading(true);

            const data = await applicationService.getStatistics();

            setStatistics(data);
            setError(null);
        } catch (err) {
            setError(err as ApiError);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchStatistics();
    }, [fetchStatistics]);

    return {
        statistics,
        loading,
        error,
        refresh: fetchStatistics,
    };
}