import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";

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
            <main className="container authpage">
                <div className="card">
                    <h2>Реєстрація</h2>

                    <form onSubmit={onSubmit} className="form">
                        <label>
                            Імʼя
                            <input value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>

                        <label>
                            Email
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                        </label>

                        <label>
                            Пароль
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                        </label>

                        <label>
                            Підтвердження пароля
                            <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" required />
                        </label>

                        {error && <div className="error">{error}</div>}

                        <button className="btn btn--primary" type="submit">Створити аккаунт</button>
                    </form>
                </div>
            </main>
        </>
    );
}