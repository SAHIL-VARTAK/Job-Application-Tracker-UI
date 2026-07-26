import { beforeEach, describe, expect, it, vi } from "vitest";

import { API_ENDPOINTS } from "@/api/endpoints";
import applicationService from "@/services/applicationService";

const mockApi = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
}));

vi.mock("@/api/interceptors", () => ({
    default: mockApi,
}));

describe("ApplicationService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getAll", () => {
        it("should return all applications", async () => {
            const applications = [
                { id: 1, company: "Google" },
                { id: 2, company: "Microsoft" },
            ];

            mockApi.get.mockResolvedValue({ data: applications });

            const result = await applicationService.getAll();

            expect(mockApi.get).toHaveBeenCalledWith(API_ENDPOINTS.APPLICATIONS);
            expect(result).toEqual(applications);
        });
    });

    describe("getById", () => {
        it("should return an application by id", async () => {
            const application = {
                id: 10,
                company: "Amazon",
            };

            mockApi.get.mockResolvedValue({ data: application });

            const result = await applicationService.getById(10);

            expect(mockApi.get).toHaveBeenCalledWith(API_ENDPOINTS.APPLICATION_BY_ID(10));
            expect(result).toEqual(application);
        });
    });

    describe("create", () => {
        it("should create an application", async () => {
            const request = {
                company: "Apple",
            };

            const response = {
                id: 1,
                ...request,
            };

            mockApi.post.mockResolvedValue({ data: response });

            const result = await applicationService.create(request as never);

            expect(mockApi.post).toHaveBeenCalledWith(API_ENDPOINTS.APPLICATIONS, request);

            expect(result).toEqual(response);
        });
    });

    describe("updateStatus", () => {
        it("should update application status", async () => {
            const request = {
                status: "INTERVIEW",
            };

            mockApi.put.mockResolvedValue({});

            await applicationService.updateStatus(5, request as never);

            expect(mockApi.put).toHaveBeenCalledWith(API_ENDPOINTS.UPDATE_STATUS(5), request);
        });
    });

    describe("delete", () => {
        it("should delete an application", async () => {
            mockApi.delete.mockResolvedValue({});

            await applicationService.delete(3);

            expect(mockApi.delete).toHaveBeenCalledWith(API_ENDPOINTS.APPLICATION_BY_ID(3));
        });
    });

    describe("search", () => {
        it("should search applications by company", async () => {
            const response = [
                {
                    id: 1,
                    company: "OpenAI",
                },
            ];

            mockApi.get.mockResolvedValue({ data: response });

            const result = await applicationService.search("OpenAI");

            expect(mockApi.get).toHaveBeenCalledWith(API_ENDPOINTS.SEARCH, {
                params: {
                    company: "OpenAI",
                },
            });

            expect(result).toEqual(response);
        });
    });

    describe("getStatistics", () => {
        it("should merge API statistics with default values", async () => {
            mockApi.get.mockResolvedValue({
                data: {
                    APPLIED: 5,
                    OFFER: 2,
                },
            });

            const result = await applicationService.getStatistics();

            expect(mockApi.get).toHaveBeenCalledWith(API_ENDPOINTS.STATISTICS);

            expect(result).toEqual({
                APPLIED: 5,
                ONLINE_ASSESSMENT: 0,
                INTERVIEW: 0,
                OFFER: 2,
                REJECTED: 0,
                ACCEPTED: 0,
            });
        });

        it("should return default statistics when API returns an empty object", async () => {
            mockApi.get.mockResolvedValue({
                data: {},
            });

            const result = await applicationService.getStatistics();

            expect(result).toEqual({
                APPLIED: 0,
                ONLINE_ASSESSMENT: 0,
                INTERVIEW: 0,
                OFFER: 0,
                REJECTED: 0,
                ACCEPTED: 0,
            });
        });
    });
});
