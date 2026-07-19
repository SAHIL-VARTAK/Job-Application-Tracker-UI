import type { ReactNode } from "react";

import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import type { StatisticsProps } from "@/types/statistics";

interface StatisticCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

function StatisticCard({
    title,
    value,
    icon,
}: StatisticCardProps) {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
            }}
        >
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    component="div"
                    variant="h4"
                    sx={{
                        mt: 1,
                        fontWeight: 700,
                    }}
                >
                    {value}
                </Typography>

                <Typography
                    component="div"
                    sx={{
                        mt: 2,
                        color: "primary.main",
                    }}
                >
                    {icon}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function StatisticsCards({
    statistics,
    loading,
}: Pick<
    StatisticsProps,
    "statistics" | "loading"
>) {
    if (loading) {
        return (
            <Grid
                container
                spacing={3}
                sx={{ mt: 1 }}
            >
                {Array.from({ length: 4 }).map(
                    (_, index) => (
                        <Grid
                            key={index}
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 3,
                            }}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    border: 1,
                                    borderColor:
                                        "divider",
                                    display: "flex",
                                    justifyContent:
                                        "center",
                                    alignItems:
                                        "center",
                                    minHeight: 160,
                                }}
                            >
                                <CircularProgress />
                            </Card>
                        </Grid>
                    ),
                )}
            </Grid>
        );
    }

    if (!statistics) {
        return null;
    }

    const total = Object.values(
        statistics,
    ).reduce(
        (sum, value) => sum + value,
        0,
    );

    const active =
        statistics.APPLIED +
        statistics.ONLINE_ASSESSMENT +
        statistics.INTERVIEW;

    const offers =
        statistics.OFFER +
        statistics.ACCEPTED;

    const successRate =
        total === 0
            ? 0
            : Math.round(
                  (statistics.ACCEPTED /
                      total) *
                      100,
              );

    const cards = [
        {
            title: "Total Applications",
            value: total,
            icon: (
                <WorkOutlineRoundedIcon fontSize="large" />
            ),
        },
        {
            title: "Active Applications",
            value: active,
            icon: (
                <PendingActionsRoundedIcon fontSize="large" />
            ),
        },
        {
            title: "Offers",
            value: offers,
            icon: (
                <EmojiEventsRoundedIcon fontSize="large" />
            ),
        },
        {
            title: "Success Rate",
            value: `${successRate}%`,
            icon: (
                <TrendingUpRoundedIcon fontSize="large" />
            ),
        },
    ];

    return (
        <Grid
            container
            spacing={3}
            sx={{
                mt: 1,
            }}
        >
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <StatisticCard
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                    />
                </Grid>
            ))}
        </Grid>
    );
}