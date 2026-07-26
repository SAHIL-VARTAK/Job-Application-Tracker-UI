import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeContextProvider, useThemeContext } from "@/context/ThemeContext";

function TestComponent() {
    const { mode, toggleTheme } = useThemeContext();

    return (
        <>
            <span data-testid="mode">{mode}</span>

            <button type="button" onClick={toggleTheme}>
                Toggle
            </button>
        </>
    );
}

describe("ThemeContext", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should use light theme by default", () => {
        render(
            <ThemeContextProvider>
                <TestComponent />
            </ThemeContextProvider>,
        );

        expect(screen.getByTestId("mode")).toHaveTextContent("light");
    });

    it("should load dark theme from localStorage", () => {
        localStorage.setItem("theme-mode", "dark");

        render(
            <ThemeContextProvider>
                <TestComponent />
            </ThemeContextProvider>,
        );

        expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    });

    it("should toggle the theme", () => {
        render(
            <ThemeContextProvider>
                <TestComponent />
            </ThemeContextProvider>,
        );

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("mode")).toHaveTextContent("dark");

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("mode")).toHaveTextContent("light");
    });

    it("should persist the theme to localStorage", () => {
        render(
            <ThemeContextProvider>
                <TestComponent />
            </ThemeContextProvider>,
        );

        fireEvent.click(screen.getByRole("button"));

        expect(localStorage.getItem("theme-mode")).toBe("dark");
    });

    it("should throw when hook is used outside provider", () => {
        expect(() => render(<TestComponent />)).toThrow(
            "useThemeContext must be used within ThemeContextProvider",
        );
    });
});
