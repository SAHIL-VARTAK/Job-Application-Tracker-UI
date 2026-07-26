import { render } from "@test/page-utils";
import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useStatistics from "@/hooks/useStatistics";
import Statistics from "@/pages/Statistics/Statistics";

vi.mock("@/hooks/useStatistics");

vi.mock("@/components/statistics/StatisticsCards", () => ({
    default: ({ loading }: { loading: boolean }) => (
        <div data-testid="statistics-cards">StatisticsCards-{String(loading)}</div>
    ),
}));

vi.mock("@/components/statistics/StatusBarChart", () => ({
    default: ({ loading }: { loading: boolean }) => (
        <div data-testid="status-bar-chart">StatusBarChart-{String(loading)}</div>
    ),
}));

vi.mock("@/components/statistics/StatusPieChart", () => ({
    default: ({ loading }: { loading: boolean }) => (
        <div data-testid="status-pie-chart">StatusPieChart-{String(loading)}</div>
    ),
}));

describe("Statistics", () => {
    const refresh = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the page title", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: false,
            error: null,
            refresh,
        });

        render(<Statistics />);

        expect(
            screen.getByRole("heading", {
                name: "Statistics",
            }),
        ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: false,
            error: null,
            refresh,
        });

        render(<Statistics />);

        expect(screen.getByText("Analyze your job application progress.")).toBeInTheDocument();
    });

    it("renders all statistics components", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: {
                APPLIED: 1,
                ONLINE_ASSESSMENT: 2,
                INTERVIEW: 3,
                OFFER: 4,
                REJECTED: 5,
                ACCEPTED: 6,
            },
            loading: false,
            error: null,
            refresh,
        });

        render(<Statistics />);

        expect(screen.getByTestId("statistics-cards")).toBeInTheDocument();

        expect(screen.getByTestId("status-bar-chart")).toBeInTheDocument();

        expect(screen.getByTestId("status-pie-chart")).toBeInTheDocument();
    });

    it("passes loading state to child components", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: true,
            error: null,
            refresh,
        });

        render(<Statistics />);

        expect(screen.getByText("StatisticsCards-true")).toBeInTheDocument();

        expect(screen.getByText("StatusBarChart-true")).toBeInTheDocument();

        expect(screen.getByText("StatusPieChart-true")).toBeInTheDocument();
    });

    it("renders an error alert", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: false,
            error: "Something went wrong",
            refresh,
        });

        render(<Statistics />);

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Retry",
            }),
        ).toBeInTheDocument();
    });

    it("calls refresh when Retry is clicked", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: false,
            error: "Something went wrong",
            refresh,
        });

        render(<Statistics />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Retry",
            }),
        );

        expect(refresh).toHaveBeenCalledTimes(1);
    });

    it("does not render charts when error is present", () => {
        vi.mocked(useStatistics).mockReturnValue({
            statistics: null,
            loading: false,
            error: "Something went wrong",
            refresh,
        });

        render(<Statistics />);

        expect(screen.queryByTestId("statistics-cards")).not.toBeInTheDocument();

        expect(screen.queryByTestId("status-bar-chart")).not.toBeInTheDocument();

        expect(screen.queryByTestId("status-pie-chart")).not.toBeInTheDocument();
    });
});
