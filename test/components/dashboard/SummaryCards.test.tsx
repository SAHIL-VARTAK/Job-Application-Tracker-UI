import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { ApplicationStatus } from "@/types/status";

const hookMocks = vi.hoisted(() => ({
    useStatistics: vi.fn(),
}));

vi.mock("@/hooks/useStatistics", () => ({
    default: hookMocks.useStatistics,
}));

vi.mock("@/components/dashboard/SummaryCard", () => ({
    default: ({ title, value }: { title: string; value: number }) => (
        <div data-testid="summary-card">
            {title}: {value}
        </div>
    ),
}));

vi.mock("@/components/dashboard/SummaryCardSkeleton", () => ({
    default: () => <div data-testid="summary-card-skeleton" />,
}));

vi.mock("@/components/dashboard/DashboardError", () => ({
    default: ({ message }: { message: string }) => (
        <div data-testid="dashboard-error">{message}</div>
    ),
}));

describe("SummaryCards", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading skeletons", () => {
        hookMocks.useStatistics.mockReturnValue({
            statistics: null,
            loading: true,
            error: null,
            refresh: vi.fn(),
        });

        render(<SummaryCards />);

        expect(screen.getAllByTestId("summary-card-skeleton")).toHaveLength(4);
    });

    it("renders error component", () => {
        hookMocks.useStatistics.mockReturnValue({
            statistics: null,
            loading: false,
            error: "Failed to load statistics.",
            refresh: vi.fn(),
        });

        render(<SummaryCards />);

        expect(screen.getByTestId("dashboard-error")).toHaveTextContent(
            "Failed to load statistics.",
        );
    });

    it("renders default error when statistics are missing", () => {
        hookMocks.useStatistics.mockReturnValue({
            statistics: null,
            loading: false,
            error: null,
            refresh: vi.fn(),
        });

        render(<SummaryCards />);

        expect(screen.getByTestId("dashboard-error")).toHaveTextContent(
            "Unable to load statistics.",
        );
    });

    it("renders all summary cards", () => {
        hookMocks.useStatistics.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            statistics: {
                [ApplicationStatus.APPLIED]: 10,
                [ApplicationStatus.INTERVIEW]: 5,
                [ApplicationStatus.OFFER]: 2,
                [ApplicationStatus.REJECTED]: 3,
            },
        });

        render(<SummaryCards />);

        expect(screen.getAllByTestId("summary-card")).toHaveLength(4);

        expect(screen.getByText("Total Applications: 20")).toBeInTheDocument();
        expect(screen.getByText("Applied: 10")).toBeInTheDocument();
        expect(screen.getByText("Interviews: 5")).toBeInTheDocument();
        expect(screen.getByText("Offers: 2")).toBeInTheDocument();
    });

    it("defaults missing statistics to zero", () => {
        hookMocks.useStatistics.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            statistics: {
                [ApplicationStatus.APPLIED]: 10,
                [ApplicationStatus.INTERVIEW]: 5,
                [ApplicationStatus.REJECTED]: 3,
                // OFFER intentionally omitted
            },
        });

        render(<SummaryCards />);

        expect(screen.getByText("Offers: 0")).toBeInTheDocument();
    });
});
