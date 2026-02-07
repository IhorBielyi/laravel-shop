import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { http } from "../../../api/http";

export default function BrandCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Вкажіть назву бренду.");
            return;
        }

        setSaving(true);

        try {
            await http.post("/api/admin/brands", { name: name.trim() });

            navigate("/admin/brands", {
                state: {
                    flash: {
                        type: "success",
                        message: "Бренд успішно створено ✅",
                    },
                },
            });
        } catch (e2) {
            // Laravel validation обычно 422 + errors
            const msg =
                e2?.response?.data?.message ||
                e2?.response?.data?.errors?.name?.[0] ||
                "Не вдалося створити бренд. Перевір дані/доступ.";

            setError(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-100 px-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="m-0 fw-bold">Створити бренд</h2>

                <NavLink to="/admin/brands" className="btn btn-outline-secondary btn-sm">
                    ← Назад
                </NavLink>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Назва бренду</label>
                            <input
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={saving}
                                autoFocus
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" type="submit" disabled={saving}>
                                {saving ? "Зберігаю..." : "Створити"}
                            </button>

                            <NavLink to="/admin/brands" className="btn btn-outline-secondary" aria-disabled={saving}>
                                Скасувати
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
        .btn:focus, .form-control:focus { box-shadow: none; }
      `}</style>
        </div>
    );
}