import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useStatistics from "@/hooks/useStatistics";

const applicationService = vi.hoisted(() => ({
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    updateStatus: vi.fn(),
    delete: vi.fn(),
    search: vi.fn(),
    getStatistics: vi.fn(),
}));

vi.mock("@/services/applicationService", () => ({
    default: applicationService,
}));

const statistics = {
    APPLIED: 5,
    ONLINE_ASSESSMENT: 2,
    INTERVIEW: 3,
    OFFER: 1,
    REJECTED: 4,
    ACCEPTED: 1,
};

describe("useStatistics", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should have the correct initial state", () => {
        applicationService.getStatistics.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useStatistics());

        expect(result.current.statistics).toBeNull();
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.refresh).toBeTypeOf("function");
    });

    it("should fetch statistics successfully", async () => {
        applicationService.getStatistics.mockResolvedValue(statistics);

        const { result } = renderHook(() => useStatistics());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(applicationService.getStatistics).toHaveBeenCalledTimes(1);
        expect(result.current.statistics).toEqual(statistics);
        expect(result.current.error).toBeNull();
    });

    it("should handle fetch failure", async () => {
        applicationService.getStatistics.mockRejectedValue(new Error());

        const { result } = renderHook(() => useStatistics());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.statistics).toBeNull();
        expect(result.current.error).toBe("Unable to load dashboard statistics.");
    });

    it("should refresh statistics", async () => {
        applicationService.getStatistics
            .mockResolvedValueOnce({
                ...statistics,
                APPLIED: 1,
            })
            .mockResolvedValueOnce(statistics);

        const { result } = renderHook(() => useStatistics());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.statistics?.APPLIED).toBe(1);

        await act(async () => {
            await result.current.refresh();
        });

        expect(applicationService.getStatistics).toHaveBeenCalledTimes(2);
        expect(result.current.statistics?.APPLIED).toBe(5);
    });

    it("should set loading while refreshing", async () => {
        let resolvePromise!: (value: typeof statistics) => void;

        applicationService.getStatistics.mockResolvedValueOnce(statistics).mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    resolvePromise = resolve;
                }),
        );

        const { result } = renderHook(() => useStatistics());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => {
            void result.current.refresh();
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            resolvePromise(statistics);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.statistics).toEqual(statistics);
    });
});
