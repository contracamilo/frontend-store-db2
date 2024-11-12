// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    redirectTo: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

