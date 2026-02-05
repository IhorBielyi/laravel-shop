import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            {/* NAVBAR — НА ВСЮ ШИРИНУ */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container-fluid">
                    {/* Mobile toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbar"
                        aria-controls="adminNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Nav content */}
                    <div className="collapse navbar-collapse" id="adminNavbar">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle px-lg-3 rounded-3"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Бренди
                                </a>

                                <ul className="dropdown-menu shadow border-0">
                                    <li>
                                        <Link
                                            className="dropdown-item d-flex align-items-center"
                                            to="/admin/brands/create"
                                        >
                                            <span className="me-2 text-primary">+</span>
                                            Створити бренд
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to="/admin/brands">
                                            Перегляд брендів
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* КОНТЕНТ — ВНУТРИ container */}
            <main className="container-fluid py-4">
                <Outlet />
            </main>
        </>
    );
}