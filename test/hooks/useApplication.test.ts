import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useApplication } from "@/hooks/useApplication";

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

const mockApplication = {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    status: "APPLIED",
};

describe("useApplication", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should have the correct initial state", () => {
        applicationService.getById.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useApplication(1));

        expect(result.current.application).toBeNull();
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.refresh).toBeTypeOf("function");
    });

    it("should fetch an application", async () => {
        applicationService.getById.mockResolvedValue(mockApplication);

        const { result } = renderHook(() => useApplication(1));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(applicationService.getById).toHaveBeenCalledWith(1);
        expect(result.current.application).toEqual(mockApplication);
        expect(result.current.error).toBeNull();
    });

    it("should handle fetch failure", async () => {
        const error = new Error("Failed");

        applicationService.getById.mockRejectedValue(error);

        const { result } = renderHook(() => useApplication(1));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.application).toBeNull();
        expect(result.current.error).toBe(error);
    });

    it("should refresh the application", async () => {
        applicationService.getById.mockResolvedValueOnce(mockApplication).mockResolvedValueOnce({
            ...mockApplication,
            status: "INTERVIEW",
        });

        const { result } = renderHook(() => useApplication(1));

        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.refresh();
        });

        expect(applicationService.getById).toHaveBeenCalledTimes(2);
        expect(result.current.application?.status).toBe("INTERVIEW");
    });

    it("should fetch again when id changes", async () => {
        applicationService.getById.mockResolvedValueOnce(mockApplication).mockResolvedValueOnce({
            id: 2,
            company: "Microsoft",
            position: "SDE",
            status: "OFFER",
        });

        const { result, rerender } = renderHook(({ id }: { id: number }) => useApplication(id), {
            initialProps: { id: 1 },
        });

        await waitFor(() => expect(result.current.loading).toBe(false));

        rerender({ id: 2 });

        await waitFor(() => expect(result.current.application?.id).toBe(2));

        expect(applicationService.getById).toHaveBeenNthCalledWith(1, 1);
        expect(applicationService.getById).toHaveBeenNthCalledWith(2, 2);
    });
});
