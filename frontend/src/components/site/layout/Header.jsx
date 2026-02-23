import React, {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../auth/AuthContext.jsx";

export default function Header() {
    const {isAuthenticated, user, logout} = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const onLogout = async () => {
        await logout();
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">

                    <Link
                        to="/"
                        className="flex items-center gap-1 text-xl font-extrabold tracking-tight text-slate-900"
                    >
                        Fresh
                        <span className="text-sky-600">Market</span>
                    </Link>

                    <div className="flex items-center gap-3">

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                >
                                    Вхід
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                                >
                                    Реєстрація
                                </Link>
                            </>
                        ) : (
                            <div className="relative" ref={dropdownRef}>

                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
                                >
                                    {user?.email || "user@email.com"}

                                    <svg
                                        className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>

                                {open && (
                                    <div
                                        className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">

                                        <Link
                                            to="/admin"
                                            target="_blank"
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                                        >
                                            Адмін-панель
                                        </Link>

                                        <Link
                                            to="/profile"
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                                        >
                                            Профіль
                                        </Link>

                                        <button
                                            onClick={onLogout}
                                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Вийти
                                        </button>

                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
}