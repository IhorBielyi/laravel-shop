import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../../../api/http";

export default function BrandShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/brands/${id}`);
            // твой формат: { success, message, data: {id,name,slug} }
            setBrand(res.data?.data ?? null);
        } catch (e) {
            setError(e?.response?.data?.message || "Не удалось загрузить бренд.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div>
                    <h2 className="m-0 fw-bold">Перегляд бренду</h2>
                    <div className="text-muted">ID: {id}</div>
                </div>

                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => navigate("/admin/brands")}>
                        Назад
                    </button>

                    <button className="btn btn-primary" onClick={() => navigate(`/admin/brands/${id}/edit`)}>
                        Редагувати
                    </button>
                </div>
            </div>

            {loading && (
                <div className="alert alert-light border mb-0">Завантаження...</div>
            )}

            {!loading && error && (
                <div className="alert alert-danger mb-0">{error}</div>
            )}

            {!loading && !error && brand && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <div className="text-muted small">ID</div>
                                <div className="fw-semibold">{brand.id}</div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="text-muted small">Імʼя</div>
                                <div className="fw-semibold">{brand.name}</div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="text-muted small">Slug</div>
                                <div>
                                    <span className="badge text-bg-light border">{brand.slug}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && !brand && (
                <div className="alert alert-warning mb-0">Бренд не знайдено.</div>
            )}
        </div>
    );
}