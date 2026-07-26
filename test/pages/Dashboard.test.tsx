import { render } from "@test/page-utils";
import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Dashboard from "@/pages/Dashboard/Dashboard";
import applicationService from "@/services/applicationService";

vi.mock("@/services/applicationService", () => ({
    default: {
        getAll: vi.fn(),
    },
}));

describe("Dashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the page title", () => {
        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        expect(
            screen.getByRole("heading", {
                level: 4,
                name: "Dashboard",
            }),
        ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        expect(screen.getByText("Track your job applications at a glance.")).toBeInTheDocument();
    });

    it("calls getAll on mount", async () => {
        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        await waitFor(() => {
            expect(applicationService.getAll).toHaveBeenCalled();
        });
    });

    it("logs the result when getAll succeeds", async () => {
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalled();
        });

        logSpy.mockRestore();
    });

    it("logs an error when getAll fails", async () => {
        const error = new Error("API Error");

        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        vi.mocked(applicationService.getAll).mockRejectedValue(error);

        render(<Dashboard />);

        await waitFor(() => {
            expect(errorSpy).toHaveBeenCalledWith(error);
        });

        errorSpy.mockRestore();
    });

    it("renders summary cards", () => {
        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        expect(
            screen.getByRole("button", {
                name: /View Applications/i,
            }),
        ).toBeInTheDocument();
    });

    it("renders quick actions section", () => {
        vi.mocked(applicationService.getAll).mockResolvedValue([]);

        render(<Dashboard />);

        expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument();
    });
});
