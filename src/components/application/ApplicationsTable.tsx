import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import type { JobApplication } from "@/types/application";
import { getApplicationColumns } from "./applicationColumns";

interface ApplicationsTableProps {
    applications: JobApplication[];
    loading: boolean;
    onView: (application: JobApplication) => void;
    onDelete: (application: JobApplication) => void;
}

export default function ApplicationsTable({
    applications,
    loading,
    onView,
    onDelete,
}: ApplicationsTableProps) {
    const columns = getApplicationColumns(
        onView,
        onDelete,
    );

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
                onRowClick={(params) => {
                    onView(params.row);
                }}
            />
        </Box>
    );
}