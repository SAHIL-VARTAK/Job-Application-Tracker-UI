import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import StatusChip from "./StatusChip";

import type { JobApplication } from "@/types/application";
import { Box } from "@mui/material";
import {
    IconButton,
    Stack,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    applications: JobApplication[];
    loading: boolean;
}

const columns: GridColDef<JobApplication>[] = [
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
        renderCell: (params) => (
            <StatusChip status={params.row.status} />
        ),
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
        width: 120,
        renderCell: () => (
            <Stack
                direction="row"
                spacing={1}
            >
                <IconButton size="small">
                    <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    color="error"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
    },
];

export default function ApplicationsTable({
    applications,
    loading,
}: Props) {
    return (
        <Box
            sx={{
                height: "calc(100vh - 220px)",
                width: "100%",
            }}
        >
            <DataGrid
                rows={applications}
                columns={columns}
                loading={loading}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}
            />
        </Box>
    );
}