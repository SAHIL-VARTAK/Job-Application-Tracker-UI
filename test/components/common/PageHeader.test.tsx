import { render } from "@test/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppSnackbar from "@/components/common/AppSnackbar";

describe("AppSnackbar", () => {
    it("renders the message when open", () => {
        render(
            <AppSnackbar open message="Saved successfully" severity="success" onClose={vi.fn()} />,
        );

        expect(screen.getByText("Saved successfully")).toBeInTheDocument();
    });

    it("does not render the message when closed", () => {
        render(
            <AppSnackbar
                open={false}
                message="Saved successfully"
                severity="success"
                onClose={vi.fn()}
            />,
        );

        expect(screen.queryByText("Saved successfully")).not.toBeInTheDocument();
    });

    it("renders success alert", () => {
        render(<AppSnackbar open message="Saved" severity="success" onClose={vi.fn()} />);

        expect(screen.getByRole("alert")).toHaveTextContent("Saved");
    });

    it("renders error alert", () => {
        render(<AppSnackbar open message="Failed" severity="error" onClose={vi.fn()} />);

        expect(screen.getByRole("alert")).toHaveTextContent("Failed");
    });

    it("renders warning alert", () => {
        render(<AppSnackbar open message="Warning" severity="warning" onClose={vi.fn()} />);

        expect(screen.getByRole("alert")).toHaveTextContent("Warning");
    });

    it("renders info alert", () => {
        render(<AppSnackbar open message="Information" severity="info" onClose={vi.fn()} />);

        expect(screen.getByRole("alert")).toHaveTextContent("Information");
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();

        render(<AppSnackbar open message="Saved" severity="success" onClose={onClose} />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /close/i,
            }),
        );

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
