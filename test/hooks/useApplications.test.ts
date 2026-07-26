import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useApplications } from "@/hooks/useApplications";

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

const mockApplications = [
    {
        id: 1,
        company: "Google",
        position: "Software Engineer",
        status: "APPLIED",
    },
    {
        id: 2,
        company: "Microsoft",
        position: "SDE",
        status: "INTERVIEW",
    },
];

describe("useApplications", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should have the correct initial state", () => {
        applicationService.getAll.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useApplications());

        expect(result.current.applications).toEqual([]);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.refresh).toBeTypeOf("function");
    });

    it("should fetch applications successfully", async () => {
        applicationService.getAll.mockResolvedValue(mockApplications);

        const { result } = renderHook(() => useApplications());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(applicationService.getAll).toHaveBeenCalledTimes(1);
        expect(result.current.applications).toEqual(mockApplications);
        expect(result.current.error).toBeNull();
    });

    it("should handle fetch failure", async () => {
        const error = new Error("Failed to load applications");

        applicationService.getAll.mockRejectedValue(error);

        const { result } = renderHook(() => useApplications());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.applications).toEqual([]);
        expect(result.current.error).toBe(error);
    });

    it("should handle non-Error rejections", async () => {
        const error = {};

        applicationService.getAll.mockRejectedValue(error);

        const { result } = renderHook(() => useApplications());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe(error);
    });

    it("should refresh applications", async () => {
        applicationService.getAll
            .mockResolvedValueOnce([mockApplications[0]])
            .mockResolvedValueOnce(mockApplications);

        const { result } = renderHook(() => useApplications());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.applications).toEqual([mockApplications[0]]);

        await act(async () => {
            await result.current.refresh();
        });

        expect(applicationService.getAll).toHaveBeenCalledTimes(2);
        expect(result.current.applications).toEqual(mockApplications);
    });

    it("should set loading while refreshing", async () => {
        let resolvePromise!: (value: typeof mockApplications) => void;

        applicationService.getAll.mockResolvedValueOnce(mockApplications).mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    resolvePromise = resolve;
                }),
        );

        const { result } = renderHook(() => useApplications());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            void result.current.refresh();
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            resolvePromise(mockApplications);
        });

        expect(result.current.loading).toBe(false);
    });
});
