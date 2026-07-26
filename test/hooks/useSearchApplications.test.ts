import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSearchApplications } from "@/hooks/useSearchApplications";

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

const results = [
    {
        id: 1,
        company: "Google",
        position: "SDE",
        status: "APPLIED",
    },
];

describe("useSearchApplications", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should have the correct initial state", () => {
        const { result } = renderHook(() => useSearchApplications());

        expect(result.current.applications).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.search).toBeTypeOf("function");
    });

    it("should search successfully", async () => {
        applicationService.search.mockResolvedValue(results);

        const { result } = renderHook(() => useSearchApplications());

        await act(async () => {
            await result.current.search("Google");
        });

        expect(applicationService.search).toHaveBeenCalledWith("Google");
        expect(result.current.applications).toEqual(results);
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it("should handle search failure", async () => {
        const error = new Error("Search failed");

        applicationService.search.mockRejectedValue(error);

        const { result } = renderHook(() => useSearchApplications());

        await act(async () => {
            await result.current.search("Google");
        });

        expect(result.current.error).toBe(error);
        expect(result.current.applications).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it("should perform multiple searches", async () => {
        applicationService.search.mockResolvedValueOnce(results).mockResolvedValueOnce([
            {
                id: 2,
                company: "Microsoft",
                position: "SDE",
                status: "OFFER",
            },
        ]);

        const { result } = renderHook(() => useSearchApplications());

        await act(async () => {
            await result.current.search("Google");
        });

        expect(result.current.applications[0].company).toBe("Google");

        await act(async () => {
            await result.current.search("Microsoft");
        });

        expect(result.current.applications[0].company).toBe("Microsoft");
        expect(applicationService.search).toHaveBeenCalledTimes(2);
    });

    it("should set loading while searching", async () => {
        let resolvePromise!: (value: typeof results) => void;

        applicationService.search.mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolvePromise = resolve;
                }),
        );

        const { result } = renderHook(() => useSearchApplications());

        act(() => {
            void result.current.search("Google");
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            resolvePromise(results);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.applications).toEqual(results);
    });
});
