import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/");
        } catch (e) {
            setError("Невірний email або пароль.");
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
                                    Вхід до акаунту
                                </h1>

                                {error && (
                                    <div className="alert alert-danger py-2">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={onSubmit}>
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
                                    <div className="mb-4">
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

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 fw-semibold py-2"
                                    >
                                        Увійти
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="text-center text-muted my-3">
                                    або
                                </div>

                                {/* Register link */}
                                <div className="text-center">
                                    <span className="text-muted me-1">
                                        Немає акаунту?
                                    </span>
                                    <a href="/register" className="fw-semibold text-decoration-none">
                                        Зареєструватися
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