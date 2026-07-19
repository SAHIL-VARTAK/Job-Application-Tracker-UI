import { useCallback, useEffect, useState } from "react";

import applicationService from "@/services/applicationService";
import type { JobApplication } from "@/types/application";
import type { ApiError } from "@/types/api";

export function useApplication(id: number) {
    const [application, setApplication] = useState<JobApplication | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    const fetchApplication = useCallback(async () => {
        try {
            setLoading(true);

            const data = await applicationService.getById(id);

            setApplication(data);
            setError(null);
        } catch (err) {
            setError(err as ApiError);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        void fetchApplication();
    }, [fetchApplication]);

    return {
        application,
        loading,
        error,
        refresh: fetchApplication,
    };
}