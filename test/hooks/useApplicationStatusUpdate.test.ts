import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useApplicationStatusUpdate } from "@/hooks/useApplicationStatusUpdate";

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

describe("useApplicationStatusUpdate", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should have the correct initial state", () => {
        const { result } = renderHook(() =>
            useApplicationStatusUpdate({
                refresh: vi.fn(),
            }),
        );

        expect(result.current.updating).toBe(false);
        expect(result.current.updateStatus).toBeTypeOf("function");
    });

    it("should update status successfully", async () => {
        const refresh = vi.fn().mockResolvedValue(undefined);
        const onSuccess = vi.fn();

        applicationService.updateStatus.mockResolvedValue(undefined);

        const { result } = renderHook(() =>
            useApplicationStatusUpdate({
                refresh,
                onSuccess,
            }),
        );

        await act(async () => {
            await result.current.updateStatus(1, "INTERVIEW");
        });

        expect(applicationService.updateStatus).toHaveBeenCalledWith(1, {
            status: "INTERVIEW",
        });
        expect(refresh).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(result.current.updating).toBe(false);
    });

    it("should set updating while updating status", async () => {
        let resolvePromise!: () => void;

        applicationService.updateStatus.mockImplementation(
            () =>
                new Promise<void>((resolve) => {
                    resolvePromise = resolve;
                }),
        );

        const { result } = renderHook(() =>
            useApplicationStatusUpdate({
                refresh: vi.fn(),
            }),
        );

        act(() => {
            void result.current.updateStatus(1, "INTERVIEW");
        });

        expect(result.current.updating).toBe(true);

        await act(async () => {
            resolvePromise();
        });

        expect(result.current.updating).toBe(false);
    });

    it("should reset updating if update fails", async () => {
        const refresh = vi.fn();

        applicationService.updateStatus.mockRejectedValue(new Error("Failed"));

        const { result } = renderHook(() =>
            useApplicationStatusUpdate({
                refresh,
            }),
        );

        await expect(
            act(async () => {
                await result.current.updateStatus(1, "INTERVIEW");
            }),
        ).rejects.toThrow("Failed");

        expect(refresh).not.toHaveBeenCalled();
        expect(result.current.updating).toBe(false);
    });

    it("should not call onSuccess when update fails", async () => {
        const onSuccess = vi.fn();

        applicationService.updateStatus.mockRejectedValue(new Error("Failed"));

        const { result } = renderHook(() =>
            useApplicationStatusUpdate({
                refresh: vi.fn(),
                onSuccess,
            }),
        );

        await expect(
            act(async () => {
                await result.current.updateStatus(1, "INTERVIEW");
            }),
        ).rejects.toThrow("Failed");

        expect(onSuccess).not.toHaveBeenCalled();
        expect(result.current.updating).toBe(false);
    });
});
