import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

vi.mock("@/pages/Dashboard/Dashboard", () => ({
    default: () => <div>Dashboard Page</div>,
}));

vi.mock("@/pages/Applications/Applications", () => ({
    default: () => <div>Applications Page</div>,
}));

vi.mock("@/pages/AddApplication/AddApplication", () => ({
    default: () => <div>Add Application Page</div>,
}));

vi.mock("@/pages/Statistics/Statistics", () => ({
    default: () => <div>Statistics Page</div>,
}));

vi.mock("@/pages/NotFound/NotFound", () => ({
    default: () => <div>Not Found Page</div>,
}));

describe("App", () => {
    beforeEach(() => {
        window.history.pushState({}, "", "/");
        vi.clearAllMocks();
    });

    it("renders Dashboard route", () => {
        window.history.pushState({}, "", "/");

        render(<App />);

        expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    });

    it("renders Applications route", () => {
        window.history.pushState({}, "", "/applications");

        render(<App />);

        expect(screen.getByText("Applications Page")).toBeInTheDocument();
    });

    it("renders Add Application route", () => {
        window.history.pushState({}, "", "/applications/new");

        render(<App />);

        expect(screen.getByText("Add Application Page")).toBeInTheDocument();
    });

    it("renders Statistics route", () => {
        window.history.pushState({}, "", "/statistics");

        render(<App />);

        expect(screen.getByText("Statistics Page")).toBeInTheDocument();
    });

    it("renders Not Found page for unknown routes", () => {
        window.history.pushState({}, "", "/unknown");

        render(<App />);

        expect(screen.getByText("Not Found Page")).toBeInTheDocument();
    });
});
