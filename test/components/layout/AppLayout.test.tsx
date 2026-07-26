import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppLayout from "@/components/layout/AppLayout";

vi.mock("@/components/layout/AppNavbar", () => ({
    default: () => <div data-testid="app-navbar">App Navbar</div>,
}));

vi.mock("@/components/layout/AppSidebar", () => ({
    default: () => <div data-testid="app-sidebar">App Sidebar</div>,
}));

describe("AppLayout", () => {
    it("renders the navbar", () => {
        render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>,
        );

        expect(screen.getByTestId("app-navbar")).toBeInTheDocument();
    });

    it("renders the sidebar", () => {
        render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>,
        );

        expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
    });

    it("renders its children", () => {
        render(
            <AppLayout>
                <div data-testid="page-content">Dashboard Content</div>
            </AppLayout>,
        );

        expect(screen.getByTestId("page-content")).toBeInTheDocument();
        expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
    });

    it("renders the main landmark", () => {
        render(
            <AppLayout>
                <div>Content</div>
            </AppLayout>,
        );

        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("renders navbar, sidebar and content together", () => {
        render(
            <AppLayout>
                <div data-testid="child">Child Content</div>
            </AppLayout>,
        );

        expect(screen.getByTestId("app-navbar")).toBeInTheDocument();
        expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });
});
