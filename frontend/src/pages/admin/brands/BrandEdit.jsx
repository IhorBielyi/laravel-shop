import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { http } from "../../../api/http";

export default function BrandEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadBrand = async () => {
            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const res = await http.get(`/api/admin/brands/${id}`);
                // у тебя show возвращает { success, message, data: {id,name,slug} } или просто data
                const brand = res.data?.data ?? res.data;

                setName(brand?.name ?? "");
            } catch (e) {
                console.log("LOAD BRAND ERROR:", e?.response?.status, e?.response?.data);
                setError(e?.response?.data?.message || "Не удалось загрузить бренд.");
            } finally {
                setLoading(false);
            }
        };

        loadBrand();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const res = await http.put(`/api/admin/brands/${id}`, { name });

            setSuccess(res.data?.message || "Бренд обновлён ✅");

            // вариант А: вернуться к списку
            // navigate("/admin/brands");

            navigate("/admin/brands", {
                state: {
                    flash: {
                        type: "success",
                        message: "Бренд успішно оновлено ✅",
                    },
                },
            });
        } catch (e) {
            console.log("UPDATE ERROR:", e?.response?.status, e?.response?.data);

            // если Laravel вернул ошибки валидации
            const validationMsg =
                e?.response?.data?.errors?.name?.[0] ||
                e?.response?.data?.message;

            setError(validationMsg || "Не удалось обновить бренд.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-4 text-muted">Завантаження...</div>
        );
    }

    return (
        <div className="w-100 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="m-0 fw-bold">Редагування бренду</h2>

                <Link to="/admin/brands" className="btn btn-outline-secondary btn-sm">
                    ← Назад
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger py-2">{error}</div>
                    )}

                    {success && (
                        <div className="alert alert-success py-2">{success}</div>
                    )}

                    <form onSubmit={onSubmit} className="row g-3">
                        <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Імʼя</label>
                            <input
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit" disabled={saving}>
                                {saving ? "Зберігаю..." : "Зберегти"}
                            </button>

                            <Link to="/admin/brands" className="btn btn-link ms-2">
                                Скасувати
                            </Link>
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