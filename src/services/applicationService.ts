import api from "@/api/interceptors";
import { API_ENDPOINTS } from "@/api/endpoints";
import type {
    ApplicationStatistics,
    CreateJobApplicationRequest,
    JobApplication,
    UpdateStatusRequest,
} from "@/types/application";

class ApplicationService {
    async getAll() {
        const response =
            await api.get<JobApplication[]>(
                API_ENDPOINTS.APPLICATIONS
            );

        return response.data;
    }

    async getById(id: number) {
        const response =
            await api.get<JobApplication>(
                API_ENDPOINTS.APPLICATION_BY_ID(id)
            );

        return response.data;
    }

    async create(data: CreateJobApplicationRequest) {
        const response =
            await api.post<JobApplication>(
                API_ENDPOINTS.APPLICATIONS,
                data
            );

        return response.data;
    }

    async updateStatus(
        id: number,
        data: UpdateStatusRequest
    ) {
        await api.put(
            API_ENDPOINTS.UPDATE_STATUS(id),
            data
        );
    }

    async delete(id: number) {
        await api.delete(
            API_ENDPOINTS.APPLICATION_BY_ID(id)
        );
    }

    async search(company: string) {
        const response =
            await api.get<JobApplication[]>(
                API_ENDPOINTS.SEARCH,
                {
                    params: {
                        company,
                    },
                }
            );

        return response.data;
    }

    async getStatistics(): Promise<ApplicationStatistics> {
        const response = await api.get<
            Partial<ApplicationStatistics>
        >("/applications/statistics");

        return {
            APPLIED: 0,
            ONLINE_ASSESSMENT: 0,
            INTERVIEW: 0,
            OFFER: 0,
            REJECTED: 0,
            ACCEPTED: 0,
            ...response.data,
        };
    }
}

export default new ApplicationService();