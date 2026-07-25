import { render } from "@test/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardError from "@/components/dashboard/DashboardError";

describe("DashboardError", () => {
    it("renders the error message", () => {
        render(<DashboardError message="Unable to load dashboard." onRetry={vi.fn()} />);

        expect(screen.getByText("Unable to load dashboard.")).toBeInTheDocument();
    });

    it("renders the Retry button", () => {
        render(<DashboardError message="Unable to load dashboard." onRetry={vi.fn()} />);

        expect(
            screen.getByRole("button", {
                name: "Retry",
            }),
        ).toBeInTheDocument();
    });

    it("calls onRetry when Retry is clicked", () => {
        const onRetry = vi.fn();

        render(<DashboardError message="Unable to load dashboard." onRetry={onRetry} />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Retry",
            }),
        );

        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});
