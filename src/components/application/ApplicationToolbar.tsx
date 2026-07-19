import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

interface ApplicationToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function ApplicationToolbar({ search, onSearchChange }: ApplicationToolbarProps) {
    return (
        <TextField
            fullWidth
            placeholder="Search by company..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ mb: 3 }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
