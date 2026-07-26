import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { STATUS_COLORS } from "@/constants/applicationStatus";
import type { StatisticsProps } from "@/types/statistics";

interface StatusBarChartProps extends Pick<StatisticsProps, "statistics" | "loading"> {}

export default function StatusBarChart({ statistics, loading }: StatusBarChartProps) {
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
            status: "Applied",
            count: statistics.APPLIED,
            color: STATUS_COLORS.APPLIED,
        },
        {
            status: "Assessment",
            count: statistics.ONLINE_ASSESSMENT,
            color: STATUS_COLORS.ONLINE_ASSESSMENT,
        },
        {
            status: "Interview",
            count: statistics.INTERVIEW,
            color: STATUS_COLORS.INTERVIEW,
        },
        {
            status: "Offer",
            count: statistics.OFFER,
            color: STATUS_COLORS.OFFER,
        },
        {
            status: "Rejected",
            count: statistics.REJECTED,
            color: STATUS_COLORS.REJECTED,
        },
        {
            status: "Accepted",
            count: statistics.ACCEPTED,
            color: STATUS_COLORS.ACCEPTED,
        },
    ];

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
            }}
        >
            <CardHeader title="Applications by Status" />

            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="status"
                            tick={{
                                fontSize: 13,
                            }}
                        />

                        <YAxis allowDecimals={false} />

                        <Tooltip
                            cursor={{
                                fill: "rgba(0,0,0,0.04)",
                            }}
                        />

                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {data.map((entry) => (
                                <Cell key={entry.status} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
