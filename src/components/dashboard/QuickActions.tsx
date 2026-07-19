import { useNavigate } from "react-router-dom";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                mt: 4,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
            }}
        >
            <CardHeader title="Quick Actions" />

            <Divider />

            <CardContent>
                <Stack 
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() =>
                            navigate("/applications/new")
                        }
                        sx={{
                            justifyContent: "flex-start",
                        }}
                    >
                        Add Application
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<WorkOutlineRoundedIcon />}
                        onClick={() =>
                            navigate("/applications")
                        }
                        sx={{
                            justifyContent: "flex-start",
                        }}
                    >
                        View Applications
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<BarChartRoundedIcon />}
                        onClick={() =>
                            navigate("/statistics")
                        }
                        sx={{
                            justifyContent: "flex-start",
                        }}
                    >
                        View Statistics
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}