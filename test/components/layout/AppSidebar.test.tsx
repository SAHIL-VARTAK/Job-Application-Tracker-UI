import { render } from "@test/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AppSidebar from "@/components/layout/AppSidebar";
import { navigationItems } from "@/constants/navigation";

const mockToggleTheme = vi.fn();

const mockThemeContext = vi.hoisted(() => ({
    useThemeContext: vi.fn(),
}));

vi.mock("@/context/ThemeContext", () => mockThemeContext);

describe("AppSidebar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    function renderLightMode() {
        mockThemeContext.useThemeContext.mockReturnValue({
            mode: "light",
            toggleTheme: mockToggleTheme,
        });

        return render(<AppSidebar />);
    }

    function renderDarkMode() {
        mockThemeContext.useThemeContext.mockReturnValue({
            mode: "dark",
            toggleTheme: mockToggleTheme,
        });

        return render(<AppSidebar />);
    }

    it("renders the application title", () => {
        renderLightMode();

        expect(screen.getByText("Job Tracker")).toBeInTheDocument();
        expect(screen.getByText("Application Manager")).toBeInTheDocument();
    });

    it("renders all navigation items", () => {
        renderLightMode();

        navigationItems.forEach((item) => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    it("renders navigation links", () => {
        renderLightMode();

        navigationItems.forEach((item) => {
            const link = screen.getByRole("link", {
                name: new RegExp(item.label, "i"),
            });

            expect(link).toHaveAttribute("href", item.path);
        });
    });

    it("shows light mode", () => {
        renderLightMode();

        expect(screen.getByText("Light Mode")).toBeInTheDocument();

        expect(screen.getByRole("switch")).not.toBeChecked();
    });

    it("shows dark mode", () => {
        renderDarkMode();

        expect(screen.getByText("Dark Mode")).toBeInTheDocument();

        expect(screen.getByRole("switch")).toBeChecked();
    });

    it("calls toggleTheme when switch is clicked", () => {
        renderLightMode();

        fireEvent.click(screen.getByRole("switch"));

        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});
