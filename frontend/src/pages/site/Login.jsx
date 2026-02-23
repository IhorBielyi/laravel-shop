import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/site/layout/Header.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (e) {
            setError("Невірний email або пароль.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />

            <main className="min-h-[calc(100vh-64px)] bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <div className="mx-auto w-full max-w-md">
                        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="p-6 sm:p-8">
                                <div className="text-center">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                        Вхід до акаунту
                                    </h1>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Увійдіть, щоб керувати замовленнями та профілем
                                    </p>
                                </div>

                                {error && (
                                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition
                                   placeholder:text-slate-400
                                   focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Пароль
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition
                                   placeholder:text-slate-400
                                   focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                autoComplete="current-password"
                                            />
                                        </div>

                                        {/* optional small link */}
                                        {/* <div className="mt-2 text-right">
                      <Link to="/forgot" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
                        Забули пароль?
                      </Link>
                    </div> */}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition
                               hover:bg-sky-700
                               focus:outline-none focus:ring-4 focus:ring-sky-200
                               disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {submitting ? "Вхід..." : "Увійти"}
                                    </button>
                                </form>

                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs font-medium text-slate-400">або</span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                <p className="text-center text-sm text-slate-600">
                                    Немає акаунту?{" "}
                                    <Link
                                        to="/register"
                                        className="font-semibold text-sky-700 hover:text-sky-800"
                                    >
                                        Зареєструватися
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-xs text-slate-400">
                            Повернутися на{" "}
                            <Link to="/" className="font-semibold text-slate-600 hover:text-slate-900">
                                головну
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}