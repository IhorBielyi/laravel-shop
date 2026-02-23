import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {http} from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
        setRole(localStorage.getItem("role"));
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const {data} = await http.post("/api/auth/login", {email, password});

        const newToken = data?.authorization?.token;
        if (!newToken) throw new Error("Token not found in response");

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.role || "");

        setToken(newToken);
        setUser(data.user);
        setRole(data.role || null);
    };

    const register = async ({
                                firstname,
                                middlename,
                                surname,
                                phone_number,
                                email,
                                password,
                                password_confirmation,
                            }) => {
        const payload = {
            firstname: String(firstname || "").trim(),
            middlename: String(middlename || "").trim(),
            surname: String(surname || "").trim(),
            phone_number: String(phone_number || "").trim(),
            email: String(email || "").trim(),
            password,
            password_confirmation,
        };

        const {data} = await http.post("/api/auth/register", payload);

        const newToken = data?.authorization?.token;
        if (!newToken) throw new Error("Token not found in response");

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(data.user || null));
        localStorage.setItem("role", data.role || "");

        setToken(newToken);
        setUser(data.user || null);
        setRole(data.role || null);

        return data;
    };

    const logout = async () => {
        try {
            await http.post("/api/auth/logout");
        } catch (e) {
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setToken(null);
        setUser(null);
        setRole(null);
    };

    const isAuthenticated = Boolean(token);

    const value = useMemo(
        () => ({user, role, token, isAuthenticated, loading, login, register, logout}),
        [user, role, token, isAuthenticated, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}