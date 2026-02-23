import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../../api/http";

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Stack,
    Alert,
    CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function BrandCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Вкажіть назву бренду.");
            return;
        }

        setSaving(true);

        try {
            await http.post("/api/admin/brands", { name: name.trim() });

            navigate("/admin/brands", {
                state: {
                    flash: {
                        type: "success",
                        message: "Бренд успішно створено ✅",
                    },
                },
            });
        } catch (e2) {
            setError(
                e2?.response?.data?.errors?.name?.[0] ||
                e2?.response?.data?.message ||
                "Не вдалося створити бренд."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(50vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 420 }}>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant="h5" fontWeight={800} textAlign="center">
                            Створити бренд
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <form onSubmit={onSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Назва бренду"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={saving}
                                    autoFocus
                                    fullWidth
                                    required
                                />

                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={
                                            saving ? <CircularProgress size={16} /> : <SaveIcon />
                                        }
                                        disabled={saving}
                                    >
                                        {saving ? "Зберігаю..." : "Створити"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        disabled={saving}
                                        onClick={() => navigate("/admin/brands")}
                                    >
                                        Назад
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}