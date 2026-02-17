import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    Skeleton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function BrandEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        const loadBrand = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await http.get(`/api/admin/brands/${id}`);
                const brand = res.data?.data ?? res.data;

                setName(brand?.name ?? "");
            } catch (e) {
                console.log("LOAD BRAND ERROR:", e?.response?.status, e?.response?.data);
                setError(e?.response?.data?.message || "Не удалось загрузить бренд.");
            } finally {
                setLoading(false);
            }
        };

        loadBrand();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        setError("");

        const trimmed = name.trim();
        if (!trimmed) {
            setError("Вкажіть назву бренду.");
            return;
        }

        setSaving(true);

        try {
            await http.put(`/api/admin/brands/${id}`, { name: trimmed });

            navigate("/admin/brands", {
                state: {
                    flash: {
                        type: "success",
                        message: "Бренд успішно оновлено ✅",
                    },
                },
            });
        } catch (e) {
            console.log("UPDATE ERROR:", e?.response?.status, e?.response?.data);

            const msg =
                e?.response?.data?.errors?.name?.[0] ||
                e?.response?.data?.message ||
                "Не удалось обновить бренд.";

            setError(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(50vh - 64px)", // высота navbar
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 520 }}>
                <CardContent>
                    <Stack spacing={3}>
                        <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5" fontWeight={800} textAlign="center">
                                Редагування бренду
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {id}
                            </Typography>
                        </Stack>

                        {error && <Alert severity="error">{error}</Alert>}

                        {loading ? (
                            <Stack spacing={2}>
                                <Skeleton variant="rounded" height={56} />
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Skeleton variant="rounded" width={140} height={40} />
                                    <Skeleton variant="rounded" width={120} height={40} />
                                </Stack>
                            </Stack>
                        ) : (
                            <form onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Назва бренду"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={saving}
                                        fullWidth
                                        autoFocus
                                        required
                                    />

                                    <Stack direction="row" spacing={2} justifyContent="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={saving}
                                            startIcon={
                                                saving ? <CircularProgress size={16} /> : <SaveIcon />
                                            }
                                        >
                                            {saving ? "Зберігаю..." : "Зберегти"}
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
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}