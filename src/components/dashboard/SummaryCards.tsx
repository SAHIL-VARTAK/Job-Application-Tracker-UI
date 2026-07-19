import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Grid } from "@mui/material";
import useStatistics from "@/hooks/useStatistics";
import { ApplicationStatus } from "@/types/status";
import DashboardError from "./DashboardError";
import SummaryCard from "./SummaryCard";
import SummaryCardSkeleton from "./SummaryCardSkeleton";

const CARD_CONFIG = [
    {
        key: "total",
        title: "Total Applications",
        color: "primary",
        icon: <WorkOutlineRoundedIcon />,
    },
    {
        key: ApplicationStatus.APPLIED,
        title: "Applied",
        color: "info",
        icon: <SendOutlinedIcon />,
    },
    {
        key: ApplicationStatus.INTERVIEW,
        title: "Interviews",
        color: "warning",
        icon: <GroupsOutlinedIcon />,
    },
    {
        key: ApplicationStatus.OFFER,
        title: "Offers",
        color: "success",
        icon: <WorkspacePremiumOutlinedIcon />,
    },
] as const;

export default function SummaryCards() {
    const { statistics, loading, error, refresh } = useStatistics();

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                    <Grid
                        key={item}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3,
                        }}
                    >
                        <SummaryCardSkeleton />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error || !statistics) {
        return <DashboardError message={error ?? "Unable to load statistics."} onRetry={refresh} />;
    }

    const total = Object.values(statistics).reduce((sum, value) => sum + value, 0);

    return (
        <Grid container spacing={3}>
            {CARD_CONFIG.map((card) => {
                const value = card.key === "total" ? total : (statistics[card.key] ?? 0);

                return (
                    <Grid
                        key={card.key}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3,
                        }}
                    >
                        <SummaryCard
                            title={card.title}
                            value={value}
                            icon={card.icon}
                            color={card.color}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}
