import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
} from "@mui/material";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { STATUS_COLORS } from "@/constants/applicationStatus";
import type { StatisticsProps } from "@/types/statistics";

interface StatusPieChartProps
    extends Pick<
        StatisticsProps,
        "statistics" | "loading"
    > {}

export default function StatusPieChart({
    statistics,
    loading,
}: StatusPieChartProps) {
    if (loading) {
        return (
            <Card
                elevation={0}
                sx={{
                    height: "100%",
                    border: 1,
                    borderColor: "divider",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 400,
                    }}
                >
                    <CircularProgress />
                </CardContent>
            </Card>
        );
    }

    if (!statistics) {
        return null;
    }

    const data = [
        {
            name: "Applied",
            value: statistics.APPLIED,
            color: STATUS_COLORS.APPLIED,
        },
        {
            name: "Assessment",
            value: statistics.ONLINE_ASSESSMENT,
            color: STATUS_COLORS.ONLINE_ASSESSMENT,
        },
        {
            name: "Interview",
            value: statistics.INTERVIEW,
            color: STATUS_COLORS.INTERVIEW,
        },
        {
            name: "Offer",
            value: statistics.OFFER,
            color: STATUS_COLORS.OFFER,
        },
        {
            name: "Rejected",
            value: statistics.REJECTED,
            color: STATUS_COLORS.REJECTED,
        },
        {
            name: "Accepted",
            value: statistics.ACCEPTED,
            color: STATUS_COLORS.ACCEPTED,
        },
    ].filter((item) => item.value > 0);

    if (data.length === 0) {
        return (
            <Card
                elevation={0}
                sx={{
                    height: "100%",
                    border: 1,
                    borderColor: "divider",
                }}
            >
                <CardHeader title="Status Distribution" />

                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 350,
                    }}
                >
                    No statistics available.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
            }}
        >
            <CardHeader title="Status Distribution" />

            <CardContent>
                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>

                        <Tooltip />

                        <Legend
                            verticalAlign="bottom"
                            height={36}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}