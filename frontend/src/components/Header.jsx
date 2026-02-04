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
        <header className="header">
            <div className="container header__inner">
                <Link to="/" className="logo">
                    Fresh<span>Market</span>
                </Link>

                <nav className="nav">
                    <Link to="/" className="nav__link">Головна</Link>
                    <a className="nav__link" href="#categories">Категорії</a>
                    <a className="nav__link" href="#deals">Акції</a>
                </nav>

                <div className="auth">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="btn btn--ghost">Вхід</Link>
                            <Link to="/register" className="btn btn--primary">Реєстрація</Link>
                        </>
                    ) : (
                        <>
                            <div className="user">
                                <div className="user__name">{user?.name || "Користувач"}</div>
                                <div className="user__email">{user?.email}</div>
                            </div>
                            <button className="btn btn--danger" onClick={onLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}