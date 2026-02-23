import React, {useEffect, useState} from "react";
import {http} from "../../../api/http.js";

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

export default function ProfileSecurityPage() {
    const [loading, setLoading] = useState(true);

    const [flash, setFlash] = useState(null);
    const [error, setError] = useState("");

    const [email, setEmail] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [savingPassword, setSavingPassword] = useState(false);

    const loadEmail = async () => {
        setLoading(true);
        setError("");
        setFlash(null);

        try {
            const res = await http.get("/api/profile");
            const p = res?.data?.data ?? null;
            setEmail(p?.email ?? "");
        } catch (e) {
            setEmail("");
            setError(e?.response?.data?.message || "Не вдалося завантажити дані безпеки.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmail();
    }, []);

    const onSubmitPassword = async (e) => {
        e.preventDefault();

        setSavingPassword(true);
        setError("");
        setFlash(null);

        if (String(password) !== String(passwordConfirmation)) {
            const msg = "Паролі не співпадають.";
            setError(msg);
            setFlash({type: "error", message: msg});
            setSavingPassword(false);
            return;
        }

        try {
            const payload = {
                old_password: oldPassword,
                password: password,
                password_confirmation: passwordConfirmation,
            };

            await http.post("/api/profile/update/password", payload);

            setOldPassword("");
            setPassword("");
            setPasswordConfirmation("");

            setFlash({
                type: "success",
                message: "Пароль успішно змінено ✅ Увійди знову, якщо сесія скинулась.",
            });
        } catch (e2) {
            const msg =
                e2?.response?.data?.message ||
                "Не вдалося змінити пароль. Перевір старий пароль або валідацію.";
            setError(msg);
            setFlash({type: "error", message: msg});
        } finally {
            setSavingPassword(false);
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

    return (
        <Stack spacing={2}>
            {flash ? <Alert severity={flash.type}>{flash.message}</Alert> : null}
            {error && !flash ? <Alert severity="error">{error}</Alert> : null}

            <Typography fontWeight={900}>Email</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled
                helperText="Поки що заглушка. Email змінюватиметься через підтвердження"
            />

            <Divider sx={{my: 1}}/>

            <Typography fontWeight={900}>Зміна пароля</Typography>

            <Box component="form" onSubmit={onSubmitPassword}>
                <Stack spacing={2}>
                    <TextField
                        label="Старий пароль"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        disabled={savingPassword}
                    />

                    <TextField
                        label="Новий пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        disabled={savingPassword}
                    />

                    <TextField
                        label="Підтвердіть пароль"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        fullWidth
                        disabled={savingPassword}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <Button type="submit" variant="contained" disabled={savingPassword}>
                            {savingPassword ? "Змінюю..." : "Змінити пароль"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
}