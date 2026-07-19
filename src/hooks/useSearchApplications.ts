import { useState } from "react";

import applicationService from "@/services/applicationService";
import type { JobApplication } from "@/types/application";
import type { ApiError } from "@/types/api";

export function useSearchApplications() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const search = async (company: string) => {
        try {
            setLoading(true);

            const data = await applicationService.search(company);

            setApplications(data);
            setError(null);
        } catch (err) {
            setError(err as ApiError);
        } finally {
            setLoading(false);
        }
    };

    return {
        applications,
        loading,
        error,
        search,
    };
}