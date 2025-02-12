import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/hook.ts";

interface ProtectedRouteProps {
    children: Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated()) return <Navigate to="/login"/>;
    return children;
};
