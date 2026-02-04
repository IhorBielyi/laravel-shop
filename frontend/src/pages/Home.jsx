import React from "react";
import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="container hero">
                <h1>Свіжі продукти щодня — швидко та зручно</h1>
                <p>Поки що це демо-шапка + авторизація</p>
            </main>
        </>
    );
}