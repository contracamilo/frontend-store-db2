import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RequireUnauthenticatedProps {
    children: React.ReactNode;
    redirectTo: string;
}

export const RequireUnauthenticated: React.FC<RequireUnauthenticatedProps> = ({ children, redirectTo }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};