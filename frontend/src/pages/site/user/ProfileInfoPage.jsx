import React, {useEffect, useMemo, useState} from "react";
import {http} from "../../../api/http.js";
import AvatarUpload from "./AvatarUpload.jsx";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function ProfileInfoPage() {
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [flash, setFlash] = useState(null); // {type,message}
    const [error, setError] = useState("");

    const [editMode, setEditMode] = useState(false);

    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const onProfileUpdated = (updatedUser) => {
        setProfile(updatedUser);
        fillFormFromProfile(updatedUser);
    };

    const fullName = useMemo(() => {
        const parts = [surname, firstname, middlename]
            .map((x) => String(x || "").trim())
            .filter(Boolean);
        return parts.length ? parts.join(" ") : "—";
    }, [surname, firstname, middlename]);

    const fillFormFromProfile = (p) => {
        setFirstname(p?.firstname ?? "");
        setMiddlename(p?.middlename ?? "");
        setSurname(p?.surname ?? "");
        setPhoneNumber(p?.phone_number ?? "");
        setEmail(p?.email ?? "");
    };

    const loadProfile = async () => {
        setLoading(true);
        setError("");
        setFlash(null);

        try {
            const res = await http.get("/api/profile");
            const p = res?.data?.data ?? null;

            setProfile(p);
            fillFormFromProfile(p);
        } catch (e) {
            setProfile(null);
            setError(e?.response?.data?.message || "Не вдалося завантажити профіль.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const onClickEdit = () => {
        if (profile) fillFormFromProfile(profile);
        setFlash(null);
        setError("");
        setEditMode(true);
    };

    const onCancelEdit = () => {
        if (profile) fillFormFromProfile(profile);
        setFlash(null);
        setError("");
        setEditMode(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");
        setFlash(null);

        try {
            const payload = {
                firstname: String(firstname).trim(),
                middlename: String(middlename).trim(),
                surname: String(surname).trim(),
                phone_number: String(phoneNumber).trim(),
            };

            const res = await http.post("/api/profile/update", payload);
            const updated = res?.data?.data ?? null;

            setProfile(updated);
            fillFormFromProfile(updated);

            setEditMode(false);
            setFlash({type: "success", message: "Дані профілю успішно оновлено ✅"});
        } catch (e2) {
            const msg = e2?.response?.data?.message || "Не вдалося оновити профіль. Перевір дані.";
            setError(msg);
            setFlash({type: "error", message: msg});
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={20}/>
                <Typography color="text.secondary">Завантаження...</Typography>
            </Stack>
        );
    }

    if (!loading && error && !profile) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!profile) {
        return <Alert severity="warning">Профіль не знайдено.</Alert>;
    }

    return (
        <Stack spacing={2}>
            {flash ? <Alert severity={flash.type}>{flash.message}</Alert> : null}
            {error && !flash ? <Alert severity="error">{error}</Alert> : null}

            <AvatarUpload
                profile={profile}
                onProfileUpdated={(updated) => {
                    setProfile(updated);
                    fillFormFromProfile(updated);
                }}
                onReloadProfile={loadProfile}
            />

            <Divider/>

            <Stack
                direction={{xs: "column", sm: "row"}}
                justifyContent="space-between"
                alignItems={{xs: "flex-start", sm: "center"}}
                spacing={1}
            >
                <Box>
                    <Typography fontWeight={900}>{fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email || "—"}
                    </Typography>
                </Box>

                {!editMode ? (
                    <Button variant="contained" onClick={onClickEdit}>
                        Редагувати
                    </Button>
                ) : null}
            </Stack>

            <Divider/>

            {!editMode && (
                <Stack spacing={1.25}>
                    <InfoRow label="Імʼя" value={profile.firstname}/>
                    <InfoRow label="По батькові" value={profile.middlename}/>
                    <InfoRow label="Прізвище" value={profile.surname}/>
                    <InfoRow label="Телефон" value={profile.phone_number}/>
                    <InfoRow label="Email" value={profile.email}/>
                </Stack>
            )}

            {editMode && (
                <Box component="form" onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Імʼя"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            fullWidth
                            disabled={saving}
                        />
                        <TextField
                            label="По батькові"
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                            fullWidth
                            disabled={saving}
                        />
                        <TextField
                            label="Прізвище"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            fullWidth
                            disabled={saving}
                        />
                        <TextField
                            label="Телефон"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            fullWidth
                            disabled={saving}
                        />

                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button variant="outlined" onClick={onCancelEdit} disabled={saving}>
                                Скасувати
                            </Button>
                            <Button type="submit" variant="contained" disabled={saving}>
                                {saving ? "Зберігаю..." : "Зберегти"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}

function InfoRow({label, value}) {
    const v = String(value ?? "").trim();
    return (
        <Stack direction={{xs: "column", sm: "row"}} spacing={1} sx={{py: 0.5}}>
            <Typography variant="body2" color="text.secondary" sx={{width: {sm: 220}, fontWeight: 700}}>
                {label}
            </Typography>
            <Typography sx={{fontWeight: 800}}>{v ? v : "—"}</Typography>
        </Stack>
    );
}