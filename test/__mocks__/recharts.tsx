import { vi } from "vitest";

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="responsive-container">{children}</div>
    ),

    BarChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="bar-chart">{children}</div>
    ),

    PieChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="pie-chart">{children}</div>
    ),

    Bar: ({ children }: { children: React.ReactNode }) => <div data-testid="bar">{children}</div>,

    Pie: ({ children }: { children: React.ReactNode }) => <div data-testid="pie">{children}</div>,

    Cell: () => <div data-testid="cell" />,

    CartesianGrid: () => <div data-testid="grid" />,

    XAxis: () => <div data-testid="x-axis" />,

    YAxis: () => <div data-testid="y-axis" />,

    Tooltip: () => <div data-testid="tooltip" />,

    Legend: () => <div data-testid="legend" />,
}));
