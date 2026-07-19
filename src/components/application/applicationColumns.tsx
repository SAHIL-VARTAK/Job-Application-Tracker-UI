import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, Stack, Tooltip } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { JobApplication } from "@/types/application";
import StatusChip from "./StatusChip";

export function getApplicationColumns(
    onView: (application: JobApplication) => void,
    onDelete: (application: JobApplication) => void,
): GridColDef<JobApplication>[] {
    return [
        {
            field: "company",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => <StatusChip status={params.row.status} />,
        },
        {
            field: "appliedDate",
            headerName: "Applied",
            flex: 1,
            valueFormatter: (value) =>
                new Intl.DateTimeFormat("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }).format(new Date(value)),
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 130,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Stack
                    sx={{
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Tooltip title="View Details">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={(event) => {
                                event.stopPropagation();
                                onView(params.row);
                            }}
                        >
                            <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Application">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDelete(params.row);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];
}
