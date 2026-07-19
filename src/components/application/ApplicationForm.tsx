import { Controller, useForm } from "react-hook-form";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    TextField,
} from "@mui/material";

import type { CreateJobApplicationRequest } from "@/types/application";

interface ApplicationFormProps {
    initialValues?: CreateJobApplicationRequest;
    loading?: boolean;
    returnAfterSave: boolean;
    onReturnAfterSaveChange: (checked: boolean) => void;
    onSubmit: (
        data: CreateJobApplicationRequest,
    ) => Promise<boolean>;
    onCancel?: () => void;
}

export default function ApplicationForm({
    initialValues,
    loading = false,
    onSubmit,
    onCancel,
    returnAfterSave,
    onReturnAfterSaveChange,
}: ApplicationFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors, isDirty },
    } = useForm<CreateJobApplicationRequest>({
        defaultValues:
            initialValues ?? {
                company: "",
                role: "",
                notes: "",
            },
    });

    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
            }}
        >
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(async (data) => {
                    const success = await onSubmit(data);

                    if (success && !returnAfterSave) {
                        reset();
                        setFocus("company");
                    }
                })}
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="company"
                            control={control}
                            rules={{
                                required: "Company is required",
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Company cannot exceed 100 characters.",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Company"
                                    fullWidth
                                    required
                                    error={!!errors.company}
                                    helperText={
                                        errors.company?.message
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="role"
                            control={control}
                            rules={{
                                required: "Role is required",
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Role cannot exceed 100 characters.",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Role"
                                    fullWidth
                                    required
                                    error={!!errors.role}
                                    helperText={
                                        errors.role?.message
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Controller
                            name="notes"
                            control={control}
                            rules={{
                                maxLength: {
                                    value: 1000,
                                    message:
                                        "Notes cannot exceed 1000 characters.",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Notes"
                                    multiline
                                    minRows={5}
                                    fullWidth
                                    error={!!errors.notes}
                                    helperText={
                                        errors.notes?.message
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={returnAfterSave}
                                    onChange={(event) =>
                                        onReturnAfterSaveChange(
                                            event.target.checked,
                                        )
                                    }
                                />
                            }
                            label="Return to applications after saving"
                        />
                    </Grid>

                    <Grid size={12}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    if (isDirty) {
                                        reset();
                                    } else {
                                        onCancel?.();
                                    }
                                }}
                            >
                                {isDirty ? "Reset" : "Cancel"}
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                loading={loading}
                            >
                                Save Application
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}