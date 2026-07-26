import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AppNavbar from "@/components/layout/AppNavbar";
import { DRAWER_WIDTH } from "@/constants/layout";

const routerMocks = vi.hoisted(() => ({
    useLocation: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

    return {
        ...actual,
        useLocation: routerMocks.useLocation,
    };
});

function renderNavbar(pathname: string) {
    routerMocks.useLocation.mockReturnValue({
        pathname,
        search: "",
        hash: "",
        state: null,
        key: "default",
    });

    return render(<AppNavbar />);
}

describe("AppNavbar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders Dashboard title for root route", () => {
        renderNavbar("/");

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("renders Applications title", () => {
        renderNavbar("/applications");

        expect(screen.getByText("Applications")).toBeInTheDocument();
    });

    it("renders Add Application title", () => {
        renderNavbar("/applications/new");

        expect(screen.getByText("Add Application")).toBeInTheDocument();
    });

    it("renders Statistics title", () => {
        renderNavbar("/statistics");

        expect(screen.getByText("Statistics")).toBeInTheDocument();
    });

    it("renders fallback title for unknown routes", () => {
        renderNavbar("/unknown");

        expect(screen.getByText("Job Application Tracker")).toBeInTheDocument();
    });

    it("renders an AppBar", () => {
        const { container } = renderNavbar("/");

        expect(container.querySelector(".MuiAppBar-root")).toBeInTheDocument();
    });

    it("uses the drawer width in styling", () => {
        const { container } = renderNavbar("/");

        const appBar = container.querySelector(".MuiAppBar-root");

        expect(appBar).toHaveStyle({
            marginLeft: `${DRAWER_WIDTH}px`,
        });

        expect(appBar).toHaveStyle({
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        });
    });
});
