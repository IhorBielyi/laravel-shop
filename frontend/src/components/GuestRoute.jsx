import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function GuestRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null; // или spinner
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}