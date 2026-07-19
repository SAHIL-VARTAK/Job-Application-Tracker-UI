import type { ApplicationStatistics } from "@/types/application";

export interface StatisticsProps {
    statistics: ApplicationStatistics | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
