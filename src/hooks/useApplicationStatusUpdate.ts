import { useState } from "react";

import applicationService from "@/services/applicationService";
import type { ApplicationStatus } from "@/types/status";

interface UseApplicationStatusUpdateProps {
    refresh: () => Promise<void>;
    onSuccess?: () => void;
}

export function useApplicationStatusUpdate({
    refresh,
    onSuccess,
}: UseApplicationStatusUpdateProps) {
    const [updating, setUpdating] = useState(false);

    const updateStatus = async (id: number, status: ApplicationStatus) => {
        setUpdating(true);

        try {
            await applicationService.updateStatus(id, {
                status,
            });

            await refresh();

            onSuccess?.();
        } finally {
            setUpdating(false);
        }
    };

    return {
        updating,
        updateStatus,
    };
}
