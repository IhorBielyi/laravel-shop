import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== password_confirmation) {
            setError("Паролі не співпадають.");
            return;
        }

        try {
            await register(name, email, password, password_confirmation);
            navigate("/");
        } catch (e) {
            setError("Помилка реєстрації. Перевірте дані (або email вже зайнятий).");
        }
    };

    return (
        <>
            <Header />

            <main className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h1 className="h4 fw-bold text-center mb-4">
                                    Створення акаунту
                                </h1>

                                {error && (
                                    <div className="alert alert-danger py-2">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={onSubmit}>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Імʼя
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Пароль
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password confirmation */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Підтвердження пароля
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password_confirmation}
                                            onChange={(e) =>
                                                setPasswordConfirmation(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 fw-semibold py-2"
                                    >
                                        Створити акаунт
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="text-center text-muted my-3">
                                    або
                                </div>

                                {/* Login link */}
                                <div className="text-center">
                                    <span className="text-muted me-1">
                                        Вже є акаунт?
                                    </span>
                                    <a
                                        href="/login"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Увійти
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}