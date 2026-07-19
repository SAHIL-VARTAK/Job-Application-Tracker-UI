import { Alert, Button, Grid } from "@mui/material";

import PageHeader from "@/components/common/PageHeader";
import StatisticsCards from "@/components/statistics/StatisticsCards";
import StatusBarChart from "@/components/statistics/StatusBarChart";
import StatusPieChart from "@/components/statistics/StatusPieChart";
import useStatistics from "@/hooks/useStatistics";
import AppLayout from "@/components/layout/AppLayout";

export default function Statistics() {
    const {
        statistics,
        loading,
        error,
        refresh,
    } = useStatistics();

    console.log(statistics);

    if (error && !loading) {
        return (
            <AppLayout>
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            onClick={() => void refresh()}
                        >
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <PageHeader
                title="Statistics"
                subtitle="Analyze your job application progress."
            />

            <StatisticsCards
                statistics={statistics}
                loading={loading}
            />

            <Grid
                container
                spacing={3}
                sx={{ mt: 1 }}
            >
                <Grid size={{ xs: 12, lg: 7 }}>
                    <StatusBarChart
                        statistics={statistics}
                        loading={loading}
                    />
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                    <StatusPieChart
                        statistics={statistics}
                        loading={loading}
                    />
                </Grid>
            </Grid>
        </AppLayout>
    );
}