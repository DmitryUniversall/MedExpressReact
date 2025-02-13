import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/hook.ts";
import { ReactNode } from "react";
import { pathSearch } from "../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../layouts/main_layout/routing.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const RequireAuthentication = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated()) return <Navigate to={pathSearch(mainLayoutRouting, "auth=>main", {})}/>;
    return <>{ children }</>;
};
