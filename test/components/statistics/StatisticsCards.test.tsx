import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatisticsCards from "@/components/statistics/StatisticsCards";

describe("StatisticsCards", () => {
    const statistics = {
        APPLIED: 5,
        ONLINE_ASSESSMENT: 2,
        INTERVIEW: 1,
        OFFER: 1,
        REJECTED: 3,
        ACCEPTED: 2,
    };

    it("renders loading state", () => {
        render(<StatisticsCards loading statistics={null} />);

        expect(screen.getAllByRole("progressbar")).toHaveLength(4);
    });

    it("renders nothing when statistics are null", () => {
        const { container } = render(<StatisticsCards loading={false} statistics={null} />);

        expect(container.firstChild).toBeNull();
    });

    it("renders all statistic cards", () => {
        render(<StatisticsCards loading={false} statistics={statistics} />);

        expect(screen.getByText("Total Applications")).toBeInTheDocument();

        expect(screen.getByText("Active Applications")).toBeInTheDocument();

        expect(screen.getByText("Offers")).toBeInTheDocument();

        expect(screen.getByText("Success Rate")).toBeInTheDocument();
    });

    it("calculates statistics correctly", () => {
        render(<StatisticsCards loading={false} statistics={statistics} />);

        // total = 14
        expect(screen.getByText("14")).toBeInTheDocument();

        // active = 5 + 2 + 1 = 8
        expect(screen.getByText("8")).toBeInTheDocument();

        // offers = 1 + 2 = 3
        expect(screen.getByText("3")).toBeInTheDocument();

        // success = round(2 / 14 * 100)
        expect(screen.getByText("14%")).toBeInTheDocument();
    });

    it("shows 0% success rate when there are no applications", () => {
        render(
            <StatisticsCards
                loading={false}
                statistics={{
                    APPLIED: 0,
                    ONLINE_ASSESSMENT: 0,
                    INTERVIEW: 0,
                    OFFER: 0,
                    REJECTED: 0,
                    ACCEPTED: 0,
                }}
            />,
        );

        expect(screen.getAllByText("0")).toHaveLength(3);
        expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("calculates active applications correctly", () => {
        render(
            <StatisticsCards
                loading={false}
                statistics={{
                    APPLIED: 10,
                    ONLINE_ASSESSMENT: 5,
                    INTERVIEW: 4,
                    OFFER: 3,
                    REJECTED: 7,
                    ACCEPTED: 2,
                }}
            />,
        );

        // active = 10 + 5 + 4 = 19
        expect(screen.getByText("19")).toBeInTheDocument();
    });

    it("calculates offers correctly", () => {
        render(
            <StatisticsCards
                loading={false}
                statistics={{
                    APPLIED: 1,
                    ONLINE_ASSESSMENT: 1,
                    INTERVIEW: 1,
                    OFFER: 4,
                    REJECTED: 1,
                    ACCEPTED: 6,
                }}
            />,
        );

        // offers = 10
        expect(screen.getByText("10")).toBeInTheDocument();
    });
});
