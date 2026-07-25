import { Typography } from "@mui/material";
import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SummaryCard from "@/components/dashboard/SummaryCard";

describe("SummaryCard", () => {
    it("renders the title", () => {
        render(
            <SummaryCard
                title="Total Applications"
                value={25}
                icon={<Typography>ICON</Typography>}
                color="primary"
            />,
        );

        expect(screen.getByText("Total Applications")).toBeInTheDocument();
    });

    it("renders the value", () => {
        render(
            <SummaryCard
                title="Total Applications"
                value={25}
                icon={<Typography>ICON</Typography>}
                color="primary"
            />,
        );

        expect(screen.getByText("25")).toBeInTheDocument();
    });

    it("renders the icon", () => {
        render(
            <SummaryCard
                title="Total Applications"
                value={25}
                icon={<Typography>ICON</Typography>}
                color="primary"
            />,
        );

        expect(screen.getByText("ICON")).toBeInTheDocument();
    });

    it("renders a Paper container", () => {
        const { container } = render(
            <SummaryCard
                title="Total Applications"
                value={25}
                icon={<Typography>ICON</Typography>}
                color="primary"
            />,
        );

        expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
    });

    it("renders the title before the value", () => {
        render(
            <SummaryCard
                title="Total Applications"
                value={25}
                icon={<Typography>ICON</Typography>}
                color="primary"
            />,
        );

        const title = screen.getByText("Total Applications");
        const value = screen.getByText("25");

        expect(title.compareDocumentPosition(value)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
});
