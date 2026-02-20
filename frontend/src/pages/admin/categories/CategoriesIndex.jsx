import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "../../../api/http";
import { Pagination } from "@mui/material";
import ConfirmDialog from "../../../components/admin/ui/ConfirmDialog";

import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Snackbar,
    Stack,
    Tooltip,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function CategoriesIndex() {
    const navigate = useNavigate();
    const location = useLocation();

    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [flash, setFlash] = useState(null); // { type, message }

    // delete
    const [deleteTarget, setDeleteTarget] = useState(null); // {id, name}
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const hasRows = useMemo(() => Array.isArray(rows) && rows.length > 0, [rows]);

    const parseCategoriesResponse = (payload) => {
        if (Array.isArray(payload?.data)) {
            return { rows: payload.data, meta: payload.meta ?? null };
        }

        if (Array.isArray(payload?.data?.data)) {
            return { rows: payload.data.data, meta: payload.data.meta ?? null };
        }

        return { rows: [], meta: null };
    };

    const load = async (nextPage = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/categories?page=${nextPage}`);
            const { rows: nextRows, meta: nextMeta } = parseCategoriesResponse(res.data);

            setRows(nextRows);
            setMeta(nextMeta);
            setPage(nextMeta?.current_page ?? nextPage);
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                `Не вдалось завантажити категорії. Status: ${e?.response?.status || "no status"}`;
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // load list
    useEffect(() => {
        load(page);
    }, [page]);

    // flash from navigation state
    useEffect(() => {
        if (location.state?.flash) {
            setFlash(location.state.flash);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const renderStatusLabel = (status) => {
        if (status && typeof status === "object") {
            return status.label ?? status.name ?? "—";
        }
        return "—";
    };

    const openDeleteDialog = (cat) => {
        setDeleteError("");
        setDeleteTarget({ id: cat.id, name: cat.name });
    };

    const closeDeleteDialog = () => {
        if (deleting) return;
        setDeleteError("");
        setDeleteTarget(null);
    };

    const shouldGoPrevPageAfterDelete = useMemo(() => {
        return rows.length === 1 && page > 1;
    }, [rows.length, page]);

    const confirmDelete = async () => {
        const categoryId = deleteTarget?.id;
        if (!categoryId || deleting) return;

        setDeleting(true);
        setDeleteError("");

        try {
            await http.delete(`/api/admin/categories/${categoryId}`);

            if (shouldGoPrevPageAfterDelete) {
                setPage((p) => p - 1);
            } else {
                await load(page);
            }

            setFlash({ type: "success", message: "Категорію успішно видалено 🗑️" });
            setDeleteTarget(null);
        } catch (e) {
            const msg = e?.response?.data?.message || "Не вдалося видалити категорію.";
            setDeleteError(msg);
            setFlash({ type: "error", message: msg });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className="m-0 font-bold text-2xl text-slate-900">Категорії</h2>
                </div>
            </div>

            {/* Flash */}
            <Snackbar
                open={!!flash}
                autoHideDuration={3500}
                onClose={() => setFlash(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {flash ? (
                    <Alert
                        onClose={() => setFlash(null)}
                        severity={flash.type}
                        variant="filled"
                        sx={{ minWidth: 320 }}
                    >
                        {flash.message}
                    </Alert>
                ) : null}
            </Snackbar>

            <Card className="w-full shadow-sm">
                <CardContent className="p-0">
                    <Divider />

                    {/* Loading */}
                    {loading && (
                        <div className="py-10 flex items-center justify-center">
                            <div className="flex items-center gap-3 text-slate-600">
                                <CircularProgress size={22} />
                                <span>Завантаження…</span>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="p-5">
                            <Alert severity="error" variant="outlined">
                                {error}
                            </Alert>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && !hasRows && (
                        <div className="p-5">
                            <Alert severity="info" variant="outlined">
                                Категорій поки немає.
                            </Alert>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && !error && hasRows && (
                        <TableContainer component={Paper} elevation={0}>
                            <Table size="small" aria-label="categories table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "rgba(59,130,246,0.10)" }}>
                                        <TableCell align="center" sx={{ width: 90, fontWeight: 800 }}>
                                            ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Назва</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Slug</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Батьківська</TableCell>
                                        <TableCell align="center" sx={{ width: 140, fontWeight: 800 }}>
                                            Статус
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: 160, fontWeight: 800 }}>
                                            Дії
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map((c) => (
                                        <TableRow
                                            key={c.id}
                                            hover
                                            sx={{
                                                "& td": { borderBottomColor: "rgba(148,163,184,0.25)" },
                                            }}
                                        >
                                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                                                {c.id}
                                            </TableCell>

                                            <TableCell>
                                                <span className="font-medium text-slate-900">{c.name}</span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">
                                                    {c.slug}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                {c.parent_info?.name ? (
                                                    <span className="text-sm text-slate-800">
                                                        {c.parent_info.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-slate-500">—</span>
                                                )}
                                            </TableCell>

                                            <TableCell align="center">
                                                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-700">
                                                    {renderStatusLabel(c.status)}
                                                </span>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Stack direction="row" spacing={0.5} justifyContent="center">
                                                    <Tooltip title="Переглянути">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/admin/categories/${c.id}`)}
                                                        >
                                                            <VisibilityOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Редагувати">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/admin/categories/${c.id}/edit`)}
                                                        >
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Видалити">
                                                        <span>
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                disabled={deleting}
                                                                onClick={() => openDeleteDialog(c)}
                                                            >
                                                                <DeleteOutlineOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* Pagination */}
                    {meta?.last_page > 1 && (
                        <>
                            <Divider />
                            <Box className="px-5 py-4 flex items-center justify-between">
                                <Typography variant="body2" color="text.secondary">
                                    Сторінка {meta.current_page} з {meta.last_page} • Всього: {meta.total}
                                </Typography>

                                <Pagination
                                    page={page}
                                    count={meta.last_page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    shape="rounded"
                                    size="small"
                                    disabled={loading || deleting}
                                />
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* ConfirmDialog */}
            <ConfirmDialog
                open={!!deleteTarget}
                title="Підтвердити видалення"
                description={
                    <>
                        Ви впевнені, що хочете видалити категорію <b>{deleteTarget?.name ?? ""}</b>?
                        {deleteError ? (
                            <div style={{ marginTop: 10 }}>
                                <Alert severity="error" variant="outlined">
                                    {deleteError}
                                </Alert>
                            </div>
                        ) : null}
                    </>
                }
                confirmText={deleting ? "Видаляю..." : "Видалити"}
                cancelText="Скасувати"
                loading={deleting}
                onClose={closeDeleteDialog}
                onConfirm={confirmDelete}
            />
        </div>
    );
}