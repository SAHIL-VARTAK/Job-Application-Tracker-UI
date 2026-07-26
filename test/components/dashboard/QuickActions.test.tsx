import { render } from "@test/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import QuickActions from "@/components/dashboard/QuickActions";

const routerMocks = vi.hoisted(() => ({
    navigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

    return {
        ...actual,
        useNavigate: () => routerMocks.navigate,
    };
});

describe("QuickActions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the card title", () => {
        render(<QuickActions />);

        expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    });

    it("renders all action buttons", () => {
        render(<QuickActions />);

        expect(
            screen.getByRole("button", {
                name: /add application/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /view applications/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /view statistics/i,
            }),
        ).toBeInTheDocument();
    });

    it("navigates to add application page", () => {
        render(<QuickActions />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /add application/i,
            }),
        );

        expect(routerMocks.navigate).toHaveBeenCalledWith("/applications/new");
    });

    it("navigates to applications page", () => {
        render(<QuickActions />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /view applications/i,
            }),
        );

        expect(routerMocks.navigate).toHaveBeenCalledWith("/applications");
    });

    it("navigates to statistics page", () => {
        render(<QuickActions />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /view statistics/i,
            }),
        );

        expect(routerMocks.navigate).toHaveBeenCalledWith("/statistics");
    });

    it("renders a card container", () => {
        const { container } = render(<QuickActions />);

        expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
    });
});
