import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@test/__mocks__/recharts";

import { render } from "@test/test-utils";
import StatusPieChart from "@/components/statistics/StatusPieChart";

describe("StatusPieChart", () => {
    const statistics = {
        APPLIED: 5,
        ONLINE_ASSESSMENT: 2,
        INTERVIEW: 1,
        OFFER: 1,
        REJECTED: 3,
        ACCEPTED: 2,
    };

    it("renders loading state", () => {
        render(<StatusPieChart loading statistics={null} />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders nothing when statistics are null", () => {
        const { container } = render(<StatusPieChart loading={false} statistics={null} />);

        expect(container.firstChild).toBeNull();
    });

    it("renders empty state when all statistics are zero", () => {
        render(
            <StatusPieChart
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

        expect(screen.getByText("Status Distribution")).toBeInTheDocument();

        expect(screen.getByText(/no statistics available/i)).toBeInTheDocument();
    });

    it("renders chart title", () => {
        render(<StatusPieChart loading={false} statistics={statistics} />);

        expect(screen.getByText("Status Distribution")).toBeInTheDocument();
    });

    it("renders responsive container", () => {
        render(<StatusPieChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("renders pie chart", () => {
        render(<StatusPieChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("pie-chart")).toBeInTheDocument();

        expect(screen.getByTestId("pie")).toBeInTheDocument();
    });

    it("renders one cell for each non-zero status", () => {
        render(<StatusPieChart loading={false} statistics={statistics} />);

        expect(screen.getAllByTestId("cell")).toHaveLength(6);
    });

    it("filters out statuses with zero values", () => {
        render(
            <StatusPieChart
                loading={false}
                statistics={{
                    APPLIED: 5,
                    ONLINE_ASSESSMENT: 0,
                    INTERVIEW: 2,
                    OFFER: 0,
                    REJECTED: 1,
                    ACCEPTED: 0,
                }}
            />,
        );

        expect(screen.getAllByTestId("cell")).toHaveLength(3);
    });

    it("renders tooltip and legend", () => {
        render(<StatusPieChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("tooltip")).toBeInTheDocument();

        expect(screen.getByTestId("legend")).toBeInTheDocument();
    });
});
