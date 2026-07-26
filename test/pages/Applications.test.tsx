import { render } from "@test/page-utils";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ApplicationDetailsDialogProps } from "@/components/application/ApplicationDetailsDialog";
import type { DeleteApplicationDialogProps } from "@/components/application/DeleteApplicationDialog";
import type { AppSnackbarProps } from "@/components/common/AppSnackbar";
import { useApplicationStatusUpdate } from "@/hooks/useApplicationStatusUpdate";
import { useApplications } from "@/hooks/useApplications";
import Applications from "@/pages/Applications/Applications";
import applicationService from "@/services/applicationService";
import type { JobApplication } from "@/types/application";

const refreshMock = vi.fn();
const updateStatusMock = vi.fn();

const snackbarProps = vi.fn();
const tableProps = vi.fn();
const toolbarProps = vi.fn();
const detailsDialogProps = vi.fn();
const deleteDialogProps = vi.fn();

const mockApplications: JobApplication[] = [
    {
        id: 1,
        company: "Google",
        role: "Software Engineer",
        status: "APPLIED",
        appliedDate: "2026-01-01",
        notes: "Google",
    },
    {
        id: 2,
        company: "Microsoft",
        role: "Backend Engineer",
        status: "INTERVIEW",
        appliedDate: "2026-01-02",
    },
];

vi.mock("@/services/applicationService", () => ({
    default: {
        delete: vi.fn(),
    },
}));

vi.mock("@/hooks/useApplications");
vi.mock("@/hooks/useApplicationStatusUpdate");

vi.mock("@/components/layout/AppLayout", () => ({
    default: ({ children }: React.PropsWithChildren) => <div data-testid="layout">{children}</div>,
}));

vi.mock("@/components/common/PageHeader", () => ({
    default: ({
        title,
        subtitle,
        actions,
    }: {
        title: string;
        subtitle: string;
        actions?: React.ReactNode;
    }) => (
        <>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {actions}
        </>
    ),
}));

type ToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

vi.mock("@/components/application/ApplicationToolbar", () => ({
    default: (props: ToolbarProps) => {
        toolbarProps(props);

        return (
            <input
                data-testid="search"
                value={props.search}
                onChange={(e) => props.onSearchChange(e.target.value)}
            />
        );
    },
}));

type TableProps = {
    applications: JobApplication[];
    loading: boolean;
    onView: (application: JobApplication) => void;
    onDelete: (application: JobApplication) => void;
};

vi.mock("@/components/application/ApplicationsTable", () => ({
    default: (props: TableProps) => {
        tableProps(props);

        return (
            <div data-testid="table">
                {props.applications.map((application) => (
                    <div key={application.id}>
                        <span>{application.company}</span>

                        <button type="button" onClick={() => props.onView(application)}>
                            View {application.company}
                        </button>

                        <button type="button" onClick={() => props.onDelete(application)}>
                            Delete {application.company}
                        </button>
                    </div>
                ))}
            </div>
        );
    },
}));

vi.mock("@/components/application/EmptyState", () => ({
    default: ({ title, description }: { title: string; description: string }) => (
        <div data-testid="empty-state">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    ),
}));

vi.mock("@/components/application/ApplicationDetailsDialog", () => ({
    default: (props: ApplicationDetailsDialogProps) => {
        detailsDialogProps(props);
        return null;
    },
}));

vi.mock("@/components/application/DeleteApplicationDialog", () => ({
    default: (props: DeleteApplicationDialogProps) => {
        deleteDialogProps(props);
        return null;
    },
}));

vi.mock("@/components/common/AppSnackbar", () => ({
    default: (props: AppSnackbarProps) => {
        snackbarProps(props);
        return null;
    },
}));

describe("Applications", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useApplications).mockReturnValue({
            applications: mockApplications,
            loading: false,
            error: null,
            refresh: refreshMock,
        });

        vi.mocked(useApplicationStatusUpdate).mockReturnValue({
            updating: false,
            updateStatus: updateStatusMock,
        });
    });

    it("renders page title", () => {
        render(<Applications />);

        expect(
            screen.getByRole("heading", {
                name: "Applications",
            }),
        ).toBeInTheDocument();
    });

    it("renders subtitle", () => {
        render(<Applications />);

        expect(screen.getByText("Track and manage your job applications.")).toBeInTheDocument();
    });

    it("renders layout", () => {
        render(<Applications />);

        expect(screen.getByTestId("layout")).toBeInTheDocument();
    });

    it("renders toolbar", () => {
        render(<Applications />);

        expect(screen.getByTestId("search")).toBeInTheDocument();
    });

    it("renders applications table", () => {
        render(<Applications />);

        expect(screen.getByTestId("table")).toBeInTheDocument();

        expect(screen.getByText("Google")).toBeInTheDocument();

        expect(screen.getByText("Microsoft")).toBeInTheDocument();
    });

    it("shows error message", () => {
        vi.mocked(useApplications).mockReturnValue({
            applications: [],
            loading: false,
            error: {
                title: "Internal Server Error",
                status: 500,
                detail: "Server error",
            },
            refresh: refreshMock,
        });

        render(<Applications />);

        expect(screen.getByText("Server error")).toBeInTheDocument();
    });

    it("shows empty state", () => {
        vi.mocked(useApplications).mockReturnValue({
            applications: [],
            loading: false,
            error: null,
            refresh: refreshMock,
        });

        render(<Applications />);

        expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });

    it("passes loading to table", () => {
        vi.mocked(useApplications).mockReturnValue({
            applications: mockApplications,
            loading: true,
            error: null,
            refresh: refreshMock,
        });

        render(<Applications />);

        expect(tableProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                loading: true,
            }),
        );
    });

    it("filters applications using search", async () => {
        render(<Applications />);

        fireEvent.change(screen.getByTestId("search"), {
            target: {
                value: "google",
            },
        });

        await waitFor(() =>
            expect(tableProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    applications: [mockApplications[0]],
                }),
            ),
        );
    });

    it("opens details dialog when View is clicked", () => {
        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "View Google",
            }),
        );

        expect(detailsDialogProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                open: true,
                application: mockApplications[0],
            }),
        );
    });

    it("closes details dialog", async () => {
        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "View Google",
            }),
        );

        const props = detailsDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            props.onClose();
        });

        await waitFor(() =>
            expect(detailsDialogProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: false,
                    application: null,
                }),
            ),
        );
    });

    it("passes updating state to details dialog", () => {
        vi.mocked(useApplicationStatusUpdate).mockReturnValue({
            updating: true,
            updateStatus: updateStatusMock,
        });

        render(<Applications />);

        expect(detailsDialogProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                loading: true,
            }),
        );
    });

    it("updates application status successfully", async () => {
        updateStatusMock.mockResolvedValue(undefined);

        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "View Google",
            }),
        );

        const props = detailsDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            await props.onUpdateStatus(mockApplications[0].id, "INTERVIEW");
        });

        expect(updateStatusMock).toHaveBeenCalledWith(1, "INTERVIEW");

        await waitFor(() =>
            expect(snackbarProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "success",
                    message: "Status updated successfully.",
                }),
            ),
        );
    });

    it("shows snackbar when status update fails", async () => {
        updateStatusMock.mockRejectedValue(new Error("Update failed"));

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "View Google",
            }),
        );

        const props = detailsDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            await props.onUpdateStatus(1, "INTERVIEW");
        });

        await waitFor(() =>
            expect(snackbarProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "error",
                    message: "Failed to update status.",
                }),
            ),
        );

        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("passes refresh callback into status hook", () => {
        render(<Applications />);

        expect(useApplicationStatusUpdate).toHaveBeenCalledWith({
            refresh: refreshMock,
            onSuccess: expect.any(Function),
        });
    });

    it("passes filtered applications to table after multiple searches", async () => {
        render(<Applications />);

        fireEvent.change(screen.getByTestId("search"), {
            target: {
                value: "micro",
            },
        });

        await waitFor(() =>
            expect(tableProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    applications: [mockApplications[1]],
                }),
            ),
        );

        fireEvent.change(screen.getByTestId("search"), {
            target: {
                value: "",
            },
        });

        await waitFor(() =>
            expect(tableProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    applications: mockApplications,
                }),
            ),
        );
    });

    it("opens delete dialog when Delete is clicked", () => {
        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Delete Google",
            }),
        );

        expect(deleteDialogProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                open: true,
                application: mockApplications[0],
            }),
        );
    });

    it("cancels delete", async () => {
        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Delete Google",
            }),
        );

        const props = deleteDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            props.onCancel();
        });

        await waitFor(() =>
            expect(deleteDialogProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: false,
                    application: null,
                }),
            ),
        );
    });

    it("deletes an application successfully", async () => {
        vi.mocked(applicationService.delete).mockResolvedValue(undefined);
        refreshMock.mockResolvedValue(undefined);

        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Delete Google",
            }),
        );

        const props = deleteDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            await props.onConfirm();
        });

        await waitFor(() => {
            expect(snackbarProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "success",
                    message: "Application deleted successfully.",
                }),
            );
        });
    });

    it("shows error snackbar when delete fails", async () => {
        vi.mocked(applicationService.delete).mockRejectedValue(new Error("Delete failed"));

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        render(<Applications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Delete Google",
            }),
        );

        const props = deleteDialogProps.mock.calls.at(-1)?.[0];

        await act(async () => {
            await props.onConfirm();
        });

        await waitFor(() => {
            expect(snackbarProps).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "error",
                    message: "Failed to delete application.",
                }),
            );
        });

        consoleSpy.mockRestore();
    });

    it("returns immediately when confirming delete with no selected application", async () => {
        render(<Applications />);

        const props = deleteDialogProps.mock.calls.at(-1)?.[0];

        await props.onConfirm();

        expect(applicationService.delete).not.toHaveBeenCalled();

        expect(refreshMock).not.toHaveBeenCalled();
    });

    it("closes snackbar", () => {
        render(<Applications />);

        const props = snackbarProps.mock.calls.at(-1)?.[0];

        props.onClose();

        expect(snackbarProps).toHaveBeenLastCalledWith(
            expect.objectContaining({
                open: false,
            }),
        );
    });
});
