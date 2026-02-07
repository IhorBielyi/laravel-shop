import React from "react";
import Header from "../../components/Header.jsx";

export default function Home() {
    return (
        <>
            <Header />

            {/* HERO */}
            <section className="bg-light py-5 border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Text */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h1 className="display-5 fw-bold mb-3">
                                Свіжі продукти щодня —
                                <span className="text-primary"> швидко та зручно</span>
                            </h1>

                            <p className="lead text-muted mb-4">
                                Онлайн-магазин продуктів з авторизацією, адмін-панеллю
                                та API. Поки що демо, але архітектура вже правильна 😉
                            </p>

                            <div className="d-flex gap-3">
                                <a href="/register" className="btn btn-primary btn-lg">
                                    Почати покупки
                                </a>

                                <a href="/login" className="btn btn-outline-secondary btn-lg">
                                    Увійти
                                </a>
                            </div>
                        </div>

                        {/* Illustration / placeholder */}
                        <div className="col-lg-6 text-center">
                            <div
                                className="bg-white rounded-4 shadow-sm p-5 h-100 d-flex flex-column justify-content-center"
                            >
                                <div className="display-1">🛒</div>
                                <p className="text-muted mt-3 mb-0">
                                    Тут буде каталог продуктів
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}