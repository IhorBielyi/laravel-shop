import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);     // {name,email}
    const [role, setRole] = useState(null);     // "admin"/"user"
    const [token, setToken] = useState(null);   // JWT
    const [loading, setLoading] = useState(true);

    // восстановление с localStorage
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
        setRole(localStorage.getItem("role"));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await http.post("/api/auth/login", { email, password });

        const newToken = data?.authorization?.token;
        if (!newToken) throw new Error("Token not found in response");

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.role || "");

        setToken(newToken);
        setUser(data.user);
        setRole(data.role || null);
    };

    const register = async (name, email, password, password_confirmation) => {
        const { data } = await http.post("/api/auth/register", {
            name, email, password, password_confirmation,
        });

        const newToken = data?.authorization?.token;
        if (!newToken) throw new Error("Token not found in response");

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.role || "");

        setToken(newToken);
        setUser(data.user);
        setRole(data.role || null);
    };

    const logout = async () => {
        try {
            await http.post("/api/auth/logout"); // ✅ важно: /api/
        } catch (e) {}

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setToken(null);
        setUser(null);
        setRole(null);
    };

    const isAuthenticated = Boolean(token);

    const value = useMemo(
        () => ({ user, role, token, isAuthenticated, loading, login, register, logout }),
        [user, role, token, isAuthenticated, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}