import React, {useEffect, useMemo, useRef, useState} from "react";
import {http} from "../../../api/http.js";

import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

export default function AvatarUpload({
                                         profile,
                                         onProfileUpdated,
                                         onReloadProfile,
                                         uploadUrl = "/api/profile/avatar",
                                         fieldName = "avatar",
                                     }) {
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const [flash, setFlash] = useState(null);
    const [error, setError] = useState("");

    const [cacheBust, setCacheBust] = useState(Date.now());

    useEffect(() => {
        if (!flash) return;
        const t = setTimeout(() => setFlash(null), 10000);
        return () => clearTimeout(t);
    }, [flash]);

    useEffect(() => {
        if (profile?.avatar || profile?.avatar_path || profile?.avatar_url) {
            setCacheBust(Date.now());
        }
    }, [profile?.avatar, profile?.avatar_path, profile?.avatar_url]);

    const baseOrigin = useMemo(() => {
        const base = http?.defaults?.baseURL || "";
        try {
            return new URL(base).origin;
        } catch {
            return window.location.origin;
        }
    }, []);

    const normalizedStoragePath = useMemo(() => {
        const raw = profile?.avatar || profile?.avatar_path || "";
        const s = String(raw || "").trim();
        if (!s) return "";
        return s.replace(/^\/?storage\//, "").replace(/^\//, "");
    }, [profile]);

    const avatarSrc = useMemo(() => {
        if (previewUrl) return previewUrl;

        if (profile?.avatar_url) {
            const url = String(profile.avatar_url);
            return url.includes("?") ? `${url}&v=${cacheBust}` : `${url}?v=${cacheBust}`;
        }

        if (normalizedStoragePath) {
            return `${baseOrigin}/storage/${normalizedStoragePath}?v=${cacheBust}`;
        }

        return "";
    }, [previewUrl, profile, normalizedStoragePath, baseOrigin, cacheBust]);

    const fallbackLetter = useMemo(() => {
        const s = String(profile?.email || profile?.firstname || "U").trim();
        return s ? s[0].toUpperCase() : "U";
    }, [profile]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const openFilePicker = () => {
        setFlash(null);
        setError("");
        fileInputRef.current?.click();
    };

    const onFileChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;

        setFlash(null);
        setError("");

        if (!String(f.type).startsWith("image/")) {
            const msg = "Оберіть зображення.";
            setError(msg);
            setFlash({type: "error", message: msg});
            return;
        }

        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
    };

    const resetSelection = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const upload = async () => {
        if (!file || uploading) return;

        setUploading(true);
        setFlash(null);
        setError("");

        try {
            const formData = new FormData();
            formData.append(fieldName, file);

            const res = await http.post(uploadUrl, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            const updated = res?.data?.data ?? null;

            if (updated && typeof onProfileUpdated === "function") {
                onProfileUpdated(updated);
            } else if (typeof onReloadProfile === "function") {
                await onReloadProfile();
            }

            setCacheBust(Date.now());

            setFlash({type: "success", message: "Аватар оновлено ✅"});

            resetSelection();
        } catch (e) {
            const msg = e?.response?.data?.message || "Не вдалося завантажити аватар.";
            setError(msg);
            setFlash({type: "error", message: msg});
        } finally {
            setUploading(false);
        }
    };

    return (
        <Stack spacing={2}>
            {flash ? <Alert severity={flash.type}>{flash.message}</Alert> : null}
            {error && !flash ? <Alert severity="error">{error}</Alert> : null}

            <Stack direction={{xs: "column", sm: "row"}} spacing={2} alignItems="center">
                <Avatar src={avatarSrc} sx={{width: 72, height: 72, fontWeight: 900}}>
                    {fallbackLetter}
                </Avatar>

                <Box sx={{flex: 1}}>
                    <Typography fontWeight={900}>Аватар</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Завантажте зображення
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={onFileChange}
                    />

                    <Button variant="outlined" onClick={openFilePicker} disabled={uploading}>
                        Обрати файл
                    </Button>

                    <Button
                        variant="contained"
                        onClick={upload}
                        disabled={!file || uploading}
                        startIcon={uploading ? <CircularProgress size={16}/> : null}
                    >
                        {uploading ? "Завантажую..." : "Завантажити"}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}