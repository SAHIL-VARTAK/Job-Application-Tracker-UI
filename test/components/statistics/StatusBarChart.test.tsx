import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@test/__mocks__/recharts";

import { render } from "@test/test-utils";
import StatusBarChart from "@/components/statistics/StatusBarChart";

describe("StatusBarChart", () => {
    const statistics = {
        APPLIED: 5,
        ONLINE_ASSESSMENT: 2,
        INTERVIEW: 1,
        OFFER: 1,
        REJECTED: 3,
        ACCEPTED: 2,
    };

    it("renders loading state", () => {
        render(<StatusBarChart loading statistics={null} />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders nothing when statistics are null", () => {
        const { container } = render(<StatusBarChart loading={false} statistics={null} />);

        expect(container.firstChild).toBeNull();
    });

    it("renders the chart title", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getByText("Applications by Status")).toBeInTheDocument();
    });

    it("renders the responsive container", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("renders the bar chart", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    it("renders one bar component", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("bar")).toBeInTheDocument();
    });

    it("renders one cell for each status", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getAllByTestId("cell")).toHaveLength(6);
    });

    it("renders chart axes and tooltip", () => {
        render(<StatusBarChart loading={false} statistics={statistics} />);

        expect(screen.getByTestId("x-axis")).toBeInTheDocument();

        expect(screen.getByTestId("y-axis")).toBeInTheDocument();

        expect(screen.getByTestId("grid")).toBeInTheDocument();

        expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });
});
