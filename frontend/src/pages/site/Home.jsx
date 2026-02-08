import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/site/layout/Header.jsx";
import {useAuth} from "../../auth/AuthContext.jsx";

export default function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Header />

            <main className="bg-slate-50">
                {/* Hero */}
                <section className="mx-auto max-w-6xl px-4 py-20">
                    <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
                        {/* Left */}
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                                Свіжі продукти —
                                <br />
                                <span className="text-sky-600">просто та зручно</span>
                            </h1>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition
                             hover:bg-sky-700
                             focus:outline-none focus:ring-4 focus:ring-sky-200"
                                >
                                    Почати покупки
                                </Link>

                                {!isAuthenticated && (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-700 transition
                             hover:bg-slate-100"
                                >
                                    Увійти
                                </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}