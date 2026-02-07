import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {http} from "../../../api/http";
import { useLocation } from "react-router-dom";


export default function BrandsIndex() {
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const [flash, setFlash] = useState(null);



    const [deleteTarget, setDeleteTarget] = useState(null); // {id, name}

    const [deleting, setDeleting] = useState(false);

    const load = async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await http.get(`/api/admin/brands?page=${page}`);

            const payload = res.data;
            const brands = payload?.data;

            setRows(Array.isArray(brands) ? brands : []);
            setMeta(null);
        } catch (e) {
            console.log("AXIOS ERROR:", e);
            console.log("STATUS:", e?.response?.status);
            console.log("DATA:", e?.response?.data);
            console.log("HEADERS:", e?.response?.headers);

            setError(
                e?.response?.data?.message ||
                `Не удалось загрузить бренды. Status: ${e?.response?.status || "no status"}`
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(1);
    }, []);

    useEffect(() => {
        if (location.state?.flash) {
            setFlash(location.state.flash);

            // чтобы сообщение не показывалось при refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const openDeleteModal = (brand) => {
        setDeleteTarget({id: brand.id, name: brand.name});

        const el = document.getElementById("deleteBrandModal");
        // bootstrap доступен глобально, если подключен bundle
        // eslint-disable-next-line no-undef
        const modal = new window.bootstrap.Modal(el);
        modal.show();
    };

    const confirmDelete = async (brandId) => {
        if (!brandId || deleting) return;

        setDeleting(true);

        try {
            await http.delete(`/api/admin/brands/${brandId}`);

            // убираем строку сразу
            setRows((prev) => prev.filter((x) => x.id !== brandId));

            setFlash({
                type: "success",
                message: "Бренд успішно видалено 🗑️",
            });
        } catch (e) {
            console.log("DELETE ERROR:", e?.response?.status, e?.response?.data);
            alert(e?.response?.data?.message || "Не удалось удалить бренд.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="w-100 px-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="m-0 fw-bold">Бренди</h2>
            </div>

            <div className="card shadow-sm border-0 w-100">
                <div className="card-body p-0">
                    <div className="table-responsive">

                        {flash && (
                            <div className={`alert alert-${flash.type} alert-dismissible fade show`} role="alert">
                                {flash.message}
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setFlash(null)}
                                />
                            </div>
                        )}

                        <table className="table table-hover align-middle mb-0 w-100">
                            <thead className="table-primary">
                            <tr>
                                <th scope="col" className="text-center" style={{width: "90px"}}>
                                    ID
                                </th>
                                <th scope="col">Імʼя</th>
                                <th scope="col">Slug</th>
                                <th scope="col" className="text-center" style={{width: "140px"}}>
                                    Дії
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted p-4">
                                        Завантаження...
                                    </td>
                                </tr>
                            )}

                            {!loading && error && (
                                <tr>
                                    <td colSpan={4} className="text-center text-danger p-4">
                                        {error}
                                    </td>
                                </tr>
                            )}

                            {!loading && !error && rows.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted p-4">
                                        Брендів поки немає.
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                !error &&
                                rows.map((b) => (
                                    <tr key={b.id}>
                                        <td className="text-center fw-semibold">{b.id}</td>
                                        <td>{b.name}</td>
                                        <td>
                                            <span className="badge text-bg-light border">{b.slug}</span>
                                        </td>

                                        <td className="text-center">
                                            <div className="btn-group" role="group" aria-label="Actions">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                                                    title="Переглянути"
                                                    onClick={() => navigate(`/admin/brands/${b.id}`)}
                                                    style={{ width: 34, height: 31 }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Редагувати"
                                                    onClick={() => navigate(`/admin/brands/${b.id}/edit`)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l2.999 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2 3 10.207V13h2.793L14 4.793 11.207 2z"/>
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Видалити"
                                                    onClick={() => confirmDelete(b.id)}
                                                    disabled={deleting}
                                                >
                                                    {deleting ? "..." : ""}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0V6zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V6z"/>
                                                        <path
                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H4.118zM2.5 3h11V2h-11v1z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        {meta ? `Показано ${meta.from}-${meta.to} з ${meta.total}` : ""}
                    </small>

                    {meta && (
                        <nav aria-label="Pagination">
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${meta.current_page === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => load(meta.current_page - 1)}>
                                        «
                                    </button>
                                </li>

                                <li className="page-item active">
                                    <span className="page-link">{meta.current_page}</span>
                                </li>

                                <li className={`page-item ${meta.current_page === meta.last_page ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => load(meta.current_page + 1)}>
                                        »
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>


            <style>{`
        .table-hover tbody tr:hover { cursor: default; }
        .page-link:focus { box-shadow: none; }
        .btn:focus { box-shadow: none; }
      `}</style>
        </div>
    );
}