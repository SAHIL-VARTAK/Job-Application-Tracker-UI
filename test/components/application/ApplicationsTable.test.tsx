import { fireEvent, render, screen } from "@test/test-utils";
import ApplicationsTable from "@/components/application/ApplicationsTable";
import type { JobApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/status";

const mocks = vi.hoisted(() => ({
    dataGrid: vi.fn(),
}));

vi.mock("@mui/x-data-grid", () => ({
    DataGrid: (props: Record<string, unknown>) => {
        mocks.dataGrid(props);

        return (
            <div data-testid="data-grid">
                <button
                    type="button"
                    data-testid="row-click"
                    onClick={() =>
                        (props.onRowClick as (params: { row: JobApplication }) => void)({
                            row: (props.rows as JobApplication[])[0],
                        })
                    }
                >
                    Row Click
                </button>
            </div>
        );
    },
}));

describe("ApplicationsTable", () => {
    const applications: JobApplication[] = [
        {
            id: 1,
            company: "Google",
            role: "Software Engineer",
            status: ApplicationStatus.APPLIED,
            appliedDate: "2026-07-01",
            notes: "Applied online",
        },
    ];

    const onView = vi.fn();
    const onDelete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the DataGrid", () => {
        render(
            <ApplicationsTable
                applications={applications}
                loading={false}
                onView={onView}
                onDelete={onDelete}
            />,
        );

        expect(screen.getByTestId("data-grid")).toBeInTheDocument();
    });

    it("passes the correct props to DataGrid", () => {
        render(
            <ApplicationsTable
                applications={applications}
                loading={true}
                onView={onView}
                onDelete={onDelete}
            />,
        );

        const props = mocks.dataGrid.mock.calls[0][0];

        expect(props.rows).toEqual(applications);
        expect(props.loading).toBe(true);

        expect(props.disableRowSelectionOnClick).toBe(true);
        expect(props.pageSizeOptions).toEqual([5, 10, 20]);

        expect(props.columns).toHaveLength(5);

        expect(props.initialState).toEqual({
            pagination: {
                paginationModel: {
                    page: 0,
                    pageSize: 10,
                },
            },
        });
    });

    it("calls onView when a row is clicked", () => {
        render(
            <ApplicationsTable
                applications={applications}
                loading={false}
                onView={onView}
                onDelete={onDelete}
            />,
        );

        fireEvent.click(screen.getByTestId("row-click"));

        expect(onView).toHaveBeenCalledWith(applications[0]);
    });
});
