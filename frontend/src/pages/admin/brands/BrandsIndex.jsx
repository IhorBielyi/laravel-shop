import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "../../../api/http";
import { Pagination } from "@mui/material";

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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function BrandsIndex() {
    const navigate = useNavigate();
    const location = useLocation();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [flash, setFlash] = useState(null); // {type: "success"|"error"|"info"|"warning", message: string}

    const [deleteTarget, setDeleteTarget] = useState(null); // {id, name}
    const [deleting, setDeleting] = useState(false);

    const hasRows = useMemo(() => Array.isArray(rows) && rows.length > 0, [rows]);

    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);


    const parseBrandsResponse = (payload) => {
        // payload = res.data

        if (Array.isArray(payload?.data)) {
            return { rows: payload.data, meta: null };
        }

        if (Array.isArray(payload?.data?.data)) {
            return { rows: payload.data.data, meta: payload.data.meta ?? null };
        }

        if (Array.isArray(payload?.data)) {
            return { rows: payload.data, meta: payload.meta ?? null };
        }

        return { rows: [], meta: null };
    };

    const load = async (nextPage = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/brands?page=${nextPage}`);

            const { rows, meta } = parseBrandsResponse(res.data);

            setRows(rows);
            setMeta(meta);
            setPage(meta?.current_page ?? nextPage);
        } catch (e) {
            const msg =
                e?.response?.data?.message ||
                `Не удалось загрузить бренды. Status: ${e?.response?.status || "no status"}`;
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(page);
    }, [page]);

    useEffect(() => {
        if (location.state?.flash) {
            setFlash(location.state.flash);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const openDeleteDialog = (brand) => {
        setDeleteTarget({ id: brand.id, name: brand.name });
    };

    const closeDeleteDialog = () => {
        if (deleting) return;
        setDeleteTarget(null);
    };

    const confirmDelete = async () => {
        const brandId = deleteTarget?.id;
        if (!brandId || deleting) return;

        setDeleting(true);

        try {
            await http.delete(`/api/admin/brands/${brandId}`);

            const willBeEmpty = rows.length === 1;
            if (willBeEmpty && page > 1) {
                setPage((p) => p - 1);
            } else {
                load(page);
            }

            setFlash({
                type: "success",
                message: "Бренд успішно видалено 🗑️",
            });
        } catch (e) {
            const msg = e?.response?.data?.message || "Не удалось удалить бренд.";
            setFlash({ type: "error", message: msg });
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    return (
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className="m-0 font-bold text-2xl text-slate-900">Бренди</h2>
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

                    {/* States */}
                    {loading && (
                        <div className="py-10 flex items-center justify-center">
                            <div className="flex items-center gap-3 text-slate-600">
                                <CircularProgress size={22} />
                                <span>Завантаження…</span>
                            </div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="p-5">
                            <Alert severity="error" variant="outlined">
                                {error}
                            </Alert>
                        </div>
                    )}

                    {!loading && !error && !hasRows && (
                        <div className="p-5">
                            <Alert severity="info" variant="outlined">
                                Брендів поки немає.
                            </Alert>
                        </div>
                    )}

                    {!loading && !error && hasRows && (
                        <TableContainer component={Paper} elevation={0}>
                            <Table size="small" aria-label="brands table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "rgba(59,130,246,0.10)" }}>
                                        <TableCell align="center" sx={{ width: 90, fontWeight: 800 }}>
                                            ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Імʼя</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>Slug</TableCell>
                                        <TableCell align="center" sx={{ width: 160, fontWeight: 800 }}>
                                            Дії
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map((b) => (
                                        <TableRow
                                            key={b.id}
                                            hover
                                            sx={{
                                                "& td": { borderBottomColor: "rgba(148,163,184,0.25)" },
                                            }}
                                        >
                                            <TableCell align="center" sx={{ fontWeight: 700 }}>
                                                {b.id}
                                            </TableCell>

                                            <TableCell>
                                                <span className="font-medium text-slate-900">{b.name}</span>
                                            </TableCell>

                                            <TableCell>
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">
                          {b.slug}
                        </span>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Stack direction="row" spacing={0.5} justifyContent="center">
                                                    <Tooltip title="Переглянути">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/admin/brands/${b.id}`)}
                                                        >
                                                            <VisibilityOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Редагувати">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/admin/brands/${b.id}/edit`)}
                                                        >
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Видалити">
                            <span>
                              <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => openDeleteDialog(b)}
                                  disabled={deleting}
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
                                    disabled={loading}
                                />
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Delete confirm dialog */}
            <Dialog open={!!deleteTarget} onClose={closeDeleteDialog} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 900 }}>Підтвердити видалення</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ви впевнені, що хочете видалити бренд{" "}
                        <b>{deleteTarget?.name ?? ""}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={closeDeleteDialog} disabled={deleting} variant="outlined">
                        Скасувати
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        disabled={deleting}
                        variant="contained"
                        color="error"
                    >
                        {deleting ? "Видаляю..." : "Видалити"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
