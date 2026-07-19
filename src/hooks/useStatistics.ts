import { useCallback, useEffect, useState } from "react";

import applicationService from "@/services/applicationService";
import type { ApplicationStatistics } from "@/types/application";

export default function useStatistics() {
    const [statistics, setStatistics] = useState<ApplicationStatistics | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await applicationService.getStatistics();

            setStatistics(data);
        } catch {
            setError("Unable to load dashboard statistics.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    return {
        statistics,
        loading,
        error,
        refresh,
    };
}
