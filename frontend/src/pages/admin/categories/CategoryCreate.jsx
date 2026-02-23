import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {http} from "../../../api/http";

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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const [status, setStatus] = useState(1);

    const [rows, setRows] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [loadingParents, setLoadingParents] = useState(true);
    const [loadingStatuses, setLoadingStatuses] = useState(true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const resetErrors = () => {
        setError("");
        setFieldErrors({});
    };

    useEffect(() => {
        const loadStatuses = async () => {
            setLoadingStatuses(true);
            resetErrors();

            try {
                const res = await http.get("/api/admin/categories/statuses");
                const list = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
                setStatuses(list);
            } catch (e) {
                setError(e?.response?.data?.message || "Не вдалося завантажити статуси.");
            } finally {
                setLoadingStatuses(false);
            }
        };

        loadStatuses();
    }, []);

    useEffect(() => {
        const loadParents = async () => {
            setLoadingParents(true);
            resetErrors();

            try {
                const res = await http.get("/api/admin/categories", {params: {per_page: 500}});

                const list = Array.isArray(res.data?.data)
                    ? res.data.data
                    : Array.isArray(res.data?.data?.data)
                        ? res.data.data.data
                        : [];

                setRows(Array.isArray(list) ? list : []);
            } catch (e) {
                setError(
                    e?.response?.data?.message ||
                    "Не вдалося завантажити список категорій для parent."
                );
            } finally {
                setLoadingParents(false);
            }
        };

        loadParents();
    }, []);

    const buildTree = (items) => {
        const map = new Map();
        const roots = [];

        for (const item of items) {
            map.set(item.id, {...item, children: []});
        }

        for (const item of items) {
            const node = map.get(item.id);
            const pid = item?.parent?.id ?? null;

            if (pid == null) {
                roots.push(node);
                continue;
            }

            const parent = map.get(pid);
            if (parent) parent.children.push(node);
            else roots.push(node);
        }

        return roots;
    };

    const flattenTree = (nodes, level = 0, out = []) => {
        nodes
            .slice()
            .sort((a, b) => String(a.name).localeCompare(String(b.name), "uk"))
            .forEach((n) => {
                out.push({id: n.id, label: `${"— ".repeat(level)}${n.name}`});
                if (Array.isArray(n.children) && n.children.length > 0) {
                    flattenTree(n.children, level + 1, out);
                }
            });

        return out;
    };

    const parentOptions = useMemo(() => {
        const tree = buildTree(Array.isArray(rows) ? rows : []);
        return flattenTree(tree);
    }, [rows]);

    const onSubmit = async (e) => {
        e.preventDefault();
        resetErrors();

        const n = name.trim();
        if (!n) {
            setError("Вкажіть назву категорії.");
            return;
        }

        setSaving(true);

        try {
            const payload = {
                name: n,
                parent_id: parentId === "" ? null : Number(parentId),
                status: Number(status),
            };

            await http.post("/api/admin/categories", payload);

            navigate("/admin/categories", {
                state: {
                    flash: {type: "success", message: "Категорію успішно створено ✅"},
                },
            });
        } catch (e2) {
            setFieldErrors(e2?.response?.data?.errors || {});
            setError(e2?.response?.data?.message || "Не вдалося створити категорію.");
        } finally {
            setSaving(false);
        }
    };

    const disabledForm = saving || loadingParents || loadingStatuses;

    const niceError =
        fieldErrors?.name?.[0] ||
        fieldErrors?.parent_id?.[0] ||
        fieldErrors?.status?.[0] ||
        error;

    return (
        <Box
            sx={{
                minHeight: "calc(60vh - 64px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Card sx={{width: "100%", maxWidth: 520}}>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant="h5" fontWeight={800} textAlign="center">
                            Створити категорію
                        </Typography>

                        {niceError && <Alert severity="error">{niceError}</Alert>}

                        {(loadingParents || loadingStatuses) && !niceError && (
                            <>
                                <Divider/>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{py: 1}}
                                >
                                    <CircularProgress size={18}/>
                                    <Typography variant="body2" color="text.secondary">
                                        Завантаження…
                                    </Typography>
                                </Stack>
                                <Divider/>
                            </>
                        )}

                        <form onSubmit={onSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Назва категорії"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={disabledForm}
                                    autoFocus
                                    fullWidth
                                    required
                                />

                                <FormControl fullWidth disabled={disabledForm}>
                                    <InputLabel id="parent-label">Батьківська категорія</InputLabel>
                                    <Select
                                        labelId="parent-label"
                                        label="Батьківська категорія"
                                        value={parentId}
                                        onChange={(e) => setParentId(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Без батьківської</em>
                                        </MenuItem>

                                        {parentOptions.map((opt) => (
                                            <MenuItem key={opt.id} value={String(opt.id)}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth disabled={disabledForm}>
                                    <InputLabel id="status-label">Статус</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        label="Статус"
                                        value={status}
                                        onChange={(e) => setStatus(Number(e.target.value))}
                                    >
                                        {statuses.map((s) => (
                                            <MenuItem key={s.value} value={s.value}>
                                                {s.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={saving ? <CircularProgress size={16}/> : <SaveIcon/>}
                                        disabled={disabledForm}
                                    >
                                        {saving ? "Зберігаю..." : "Створити"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon/>}
                                        disabled={saving}
                                        onClick={() => navigate("/admin/categories")}
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