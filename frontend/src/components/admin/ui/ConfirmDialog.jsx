import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

export default function ConfirmDialog({
                                          open,
                                          title = "Підтвердження",
                                          description,
                                          confirmText = "Підтвердити",
                                          cancelText = "Скасувати",
                                          confirmColor = "error",
                                          loading = false,
                                          onClose,
                                          onConfirm,
                                      }) {
    return (
        <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 900 }}>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={loading} variant="outlined">
                    {cancelText}
                </Button>

                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color={confirmColor}
                >
                    {loading ? "..." : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}