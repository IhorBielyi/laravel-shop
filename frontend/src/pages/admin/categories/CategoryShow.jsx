import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {http} from "../../../api/http.js";

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

export default function CategoryShow() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(Boolean(id));
    const [error, setError] = useState("");

    const normalize = (payload) => {
        const c = payload?.data;
        if (c && typeof c === "object" && !Array.isArray(c)) return c;
        return null;
    };

    const load = async () => {
        if (!id) return;

        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/categories/${id}`);
            setCategory(normalize(res.data));
        } catch (e) {
            setCategory(null);
            setError(e?.response?.data?.message || "Помилка при завантаженні категорії!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [id]);

    const statusLabel = category?.status?.label ?? "—";
    const statusValue = category?.status?.value ?? null;

    const statusColor = useMemo(() => {
        if (statusValue === 1) return "success";
        if (statusValue === 0) return "error";
        return "default";
    }, [statusValue]);

    const parentName = category?.parent?.name ?? "—";

    return (
        <Box sx={{width: "100%"}}>
            <Stack
                direction={{xs: "column", sm: "row"}}
                alignItems={{xs: "flex-start", sm: "center"}}
                justifyContent="space-between"
                spacing={2}
                sx={{mb: 2}}
            >
                <Box>
                    <Typography variant="h5" fontWeight={800}>
                        Перегляд категорії
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 0.75}}>
                        <Typography variant="body2" color="text.secondary">
                            ID:
                        </Typography>
                        <Chip size="small" label={id ?? "—"} variant="outlined"/>
                    </Stack>

                    <Breadcrumbs sx={{mt: 1}} aria-label="breadcrumb">
                        <MuiLink
                            underline="hover"
                            color="inherit"
                            sx={{cursor: "pointer"}}
                            onClick={() => navigate("/admin/categories")}
                        >
                            Категорії
                        </MuiLink>
                        <Typography color="text.primary">Перегляд</Typography>
                    </Breadcrumbs>
                </Box>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => navigate("/admin/categories")}
                    >
                        Назад
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<EditIcon/>}
                        onClick={() => navigate(`/admin/categories/${id}/edit`)}
                        disabled={loading || !!error || !category}
                    >
                        Редагувати
                    </Button>
                </Stack>
            </Stack>

            {loading && (
                <Card variant="outlined">
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <CircularProgress size={22}/>
                            <Typography color="text.secondary">Завантаження...</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {!loading && error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && !category && (
                <Alert severity="warning">Категорію не знайдено.</Alert>
            )}

            {!loading && !error && category && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="subtitle1" fontWeight={800} sx={{mb: 1}}>
                            Деталі
                        </Typography>

                        <Divider sx={{mb: 2}}/>

                        <Stack direction={{xs: "column", md: "row"}} spacing={2} sx={{width: "100%"}}>
                            <Box sx={{flex: 1}}>
                                <Typography variant="caption" color="text.secondary">
                                    ID
                                </Typography>
                                <Typography fontWeight={700}>{category.id}</Typography>
                            </Box>

                            <Box sx={{flex: 1}}>
                                <Typography variant="caption" color="text.secondary">
                                    Назва
                                </Typography>
                                <Typography fontWeight={700}>{category.name ?? "—"}</Typography>
                            </Box>

                            <Box sx={{flex: 1}}>
                                <Typography variant="caption" color="text.secondary">
                                    Slug
                                </Typography>
                                <Typography fontWeight={700}>{category.slug ?? "—"}</Typography>
                            </Box>

                            <Box sx={{flex: 1}}>
                                <Typography variant="caption" color="text.secondary">
                                    Батьківська категорія
                                </Typography>
                                <Typography fontWeight={700}>{parentName}</Typography>
                            </Box>

                            <Box sx={{flex: 1}}>
                                <Typography variant="caption" color="text.secondary">
                                    Статус
                                </Typography>

                                <Box sx={{mt: 0.5}}>
                                    <Chip label={statusLabel} variant="outlined" color={statusColor}/>
                                </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}