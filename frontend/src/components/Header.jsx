import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold">
                    Fresh<span className="text-primary">Market</span>
                </Link>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Content */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    {/* Right side */}
                    <div className="ms-auto d-flex align-items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Вхід
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-primary btn-sm"
                                >
                                    Реєстрація
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* User info */}
                                <div className="text-end me-2">
                                    <div className="fw-semibold lh-sm">
                                        {user?.name || "Користувач"}
                                    </div>
                                    <small className="text-muted">
                                        {user?.email}
                                    </small>
                                </div>

                                {/* Admin panel */}
                                <Link
                                    to="/admin"
                                    className="btn btn-outline-secondary btn-sm"
                                    target="_blank"
                                >
                                    Адмін-панель
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={onLogout}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Вийти
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}