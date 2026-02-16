import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext.jsx";

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 text-xl font-extrabold tracking-tight text-slate-900"
                    >
                        Fresh
                        <span className="text-sky-600">Market</span>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition
                             hover:bg-slate-100"
                                >
                                    Вхід
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition
                             hover:bg-sky-700
                             focus:outline-none focus:ring-4 focus:ring-sky-200"
                                >
                                    Реєстрація
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* User info */}
                                <div className="hidden text-right sm:block">
                                    <div className="text-sm font-semibold text-slate-900 leading-tight">
                                        {user?.name || "Користувач"}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {user?.email}
                                    </div>
                                </div>

                                {/* Admin */}
                                <Link
                                    to="/admin"
                                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition
                             hover:bg-slate-100"
                                    target="_blank"
                                >
                                    Адмін-панель
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={onLogout}
                                    className="rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition
                             hover:bg-red-50
                             focus:outline-none focus:ring-4 focus:ring-red-100"
                                >
                                    Вийти
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}