import { fireEvent, render, screen } from "@test/test-utils";
import { getApplicationColumns } from "@/components/application/applicationColumns";
import type { JobApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/status";

vi.mock("@/components/application/StatusChip", () => ({
    default: ({ status }: { status: ApplicationStatus }) => (
        <div data-testid="status-chip">{status}</div>
    ),
}));

describe("applicationColumns", () => {
    const application: JobApplication = {
        id: 1,
        company: "Google",
        role: "Software Engineer",
        status: ApplicationStatus.INTERVIEW,
        appliedDate: "2026-07-01",
        notes: "Test notes",
    };

    const onView = vi.fn();
    const onDelete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns all expected columns", () => {
        const columns = getApplicationColumns(onView, onDelete);

        expect(columns).toHaveLength(5);

        expect(columns.map((column) => column.field)).toEqual([
            "company",
            "role",
            "status",
            "appliedDate",
            "actions",
        ]);
    });

    it("renders the status chip", () => {
        const columns = getApplicationColumns(onView, onDelete);

        const statusColumn = columns.find((column) => column.field === "status");

        expect(statusColumn).toBeDefined();
        expect(statusColumn?.renderCell).toBeDefined();

        const cell = statusColumn?.renderCell?.({
            row: application,
        } as never);

        render(<>{cell}</>);

        expect(screen.getByTestId("status-chip")).toHaveTextContent(ApplicationStatus.INTERVIEW);
    });

    it("formats the applied date", () => {
        const columns = getApplicationColumns(onView, onDelete);

        const dateColumn = columns.find((column) => column.field === "appliedDate");

        expect(dateColumn).toBeDefined();
        expect(dateColumn?.valueFormatter).toBeDefined();

        if (!dateColumn?.valueFormatter) {
            throw new Error("valueFormatter not found");
        }

        const valueFormatter = dateColumn.valueFormatter as (value: string) => string;

        expect(valueFormatter("2026-07-01")).toBe("01 Jul 2026");
    });

    it("calls onView and stops propagation", () => {
        const columns = getApplicationColumns(onView, onDelete);

        const actionsColumn = columns.find((column) => column.field === "actions");

        expect(actionsColumn).toBeDefined();
        expect(actionsColumn?.renderCell).toBeDefined();

        const cell = actionsColumn?.renderCell?.({
            row: application,
        } as never);

        render(<>{cell}</>);

        fireEvent.click(
            screen.getByRole("button", {
                name: /view details/i,
            }),
        );

        expect(onView).toHaveBeenCalledWith(application);
    });

    it("calls onDelete and stops propagation", () => {
        const columns = getApplicationColumns(onView, onDelete);

        const actionsColumn = columns.find((column) => column.field === "actions");

        expect(actionsColumn).toBeDefined();
        expect(actionsColumn?.renderCell).toBeDefined();

        const cell = actionsColumn?.renderCell?.({
            row: application,
        } as never);

        render(<>{cell}</>);

        fireEvent.click(
            screen.getByRole("button", {
                name: /delete application/i,
            }),
        );

        expect(onDelete).toHaveBeenCalledWith(application);
    });

    it("has the expected action column configuration", () => {
        const columns = getApplicationColumns(onView, onDelete);

        const actionsColumn = columns.find((column) => column.field === "actions");

        expect(actionsColumn).toBeDefined();

        expect(actionsColumn?.sortable).toBe(false);
        expect(actionsColumn?.filterable).toBe(false);
        expect(actionsColumn?.disableColumnMenu).toBe(true);
        expect(actionsColumn?.width).toBe(130);
        expect(actionsColumn?.align).toBe("center");
        expect(actionsColumn?.headerAlign).toBe("center");
    });
});
