import { render } from "@test/test-utils";
import { describe, expect, it } from "vitest";
import SummaryCardSkeleton from "@/components/dashboard/SummaryCardSkeleton";

describe("SummaryCardSkeleton", () => {
    it("renders a Paper container", () => {
        const { container } = render(<SummaryCardSkeleton />);

        expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
    });

    it("renders three skeletons", () => {
        const { container } = render(<SummaryCardSkeleton />);

        expect(container.querySelectorAll(".MuiSkeleton-root")).toHaveLength(3);
    });

    it("renders a circular skeleton", () => {
        const { container } = render(<SummaryCardSkeleton />);

        expect(container.querySelector(".MuiSkeleton-circular")).toBeInTheDocument();
    });

    it("renders inside a stack", () => {
        const { container } = render(<SummaryCardSkeleton />);

        expect(container.querySelector(".MuiStack-root")).toBeInTheDocument();
    });
});
