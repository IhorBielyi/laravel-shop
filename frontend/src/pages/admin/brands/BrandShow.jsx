import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../../../api/http";

import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Alert,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

export default function BrandShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/brands/${id}`);
            setBrand(res.data?.data ?? null);
        } catch (e) {
            setError(e?.response?.data?.message || "Не удалось загрузить бренд.");
            setBrand(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Box sx={{ width: "100%" }}>
            {/* Header row */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 2 }}
            >
                <Box>
                    <Typography variant="h5" fontWeight={800}>
                        Перегляд бренду
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75 }}>
                        <Typography variant="body2" color="text.secondary">
                            ID:
                        </Typography>
                        <Chip size="small" label={id} variant="outlined" />
                    </Stack>

                    <Breadcrumbs sx={{ mt: 1 }} aria-label="breadcrumb">
                        <MuiLink
                            underline="hover"
                            color="inherit"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/admin/brands")}
                        >
                            Бренди
                        </MuiLink>
                        <Typography color="text.primary">Перегляд</Typography>
                    </Breadcrumbs>
                </Box>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/admin/brands")}
                    >
                        Назад
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/admin/brands/${id}/edit`)}
                    >
                        Редагувати
                    </Button>
                </Stack>
            </Stack>

            {/* States */}
            {loading && (
                <Card variant="outlined">
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <CircularProgress size={22} />
                            <Typography color="text.secondary">Завантаження...</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {!loading && error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && !brand && (
                <Alert severity="warning">Бренд не знайдено.</Alert>
            )}

            {!loading && !error && brand && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                            Деталі
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            sx={{ width: "100%" }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    ID
                                </Typography>
                                <Typography fontWeight={700}>{brand.id}</Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Імʼя
                                </Typography>
                                <Typography fontWeight={700}>{brand.name}</Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Slug
                                </Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    <Chip label={brand.slug} variant="outlined" />
                                </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}