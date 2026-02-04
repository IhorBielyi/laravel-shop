import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";

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
            <main className="container authpage">
                <div className="card">
                    <h2>Вхід</h2>

                    <form onSubmit={onSubmit} className="form">
                        <label>
                            Email
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                        </label>

                        <label>
                            Пароль
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                        </label>

                        {error && <div className="error">{error}</div>}

                        <button className="btn btn--primary" type="submit">Увійти</button>
                    </form>
                </div>
            </main>
        </>
    );
}