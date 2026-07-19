import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "@/components/application/ApplicationForm";
import AppSnackbar from "@/components/common/AppSnackbar";
import PageHeader from "@/components/common/PageHeader";
import AppLayout from "@/components/layout/AppLayout";

import applicationService from "@/services/applicationService";
import type { CreateJobApplicationRequest } from "@/types/application";

export default function AddApplication() {
    const navigate = useNavigate();

    const [returnAfterSave, setReturnAfterSave] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success" as "success" | "error" | "warning" | "info",
        message: "",
    });

    const handleSubmit = async (data: CreateJobApplicationRequest): Promise<boolean> => {
        try {
            setLoading(true);

            await applicationService.create(data);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Application created successfully.",
            });

            if (returnAfterSave) {
                setTimeout(() => {
                    navigate("/applications");
                }, 800);
            }

            return true;
        } catch {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Failed to create application.",
            });

            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <PageHeader title="Add Application" subtitle="Track a new job application." />

            <ApplicationForm
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => navigate("/applications")}
                returnAfterSave={returnAfterSave}
                onReturnAfterSaveChange={setReturnAfterSave}
            />

            <AppSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </AppLayout>
    );
}
