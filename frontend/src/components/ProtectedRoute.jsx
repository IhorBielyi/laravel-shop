import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null; // или loader
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
}