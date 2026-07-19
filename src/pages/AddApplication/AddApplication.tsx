import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/common/PageHeader";

export default function AddApplication() {
    return (
        <AppLayout>
            <PageHeader
                title="Add Application"
                subtitle="Fill in the details to add a new job application."
            />
        </AppLayout>
    );
}