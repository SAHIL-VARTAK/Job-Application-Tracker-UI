import { useCallback, useEffect, useState } from "react";

import applicationService from "@/services/applicationService";
import type { JobApplication } from "@/types/application";
import type { ApiError } from "@/types/api";

export function useApplications() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    const fetchApplications = useCallback(async () => {
        try {
            setLoading(true);

            const data = await applicationService.getAll();

            setApplications(data);
            setError(null);
        } catch (err) {
            setError(err as ApiError);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchApplications();
    }, [fetchApplications]);

    return {
        applications,
        loading,
        error,
        refresh: fetchApplications,
    };
}