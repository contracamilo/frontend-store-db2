import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductListContainer from './components/ProductList/ProductListContainer';
import ProductCategoryContainer from './components/ProductCategory/ProductCategoryContainer';
import CartContainer from './components/Cart/CartContainer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import {DefaultRoute, ProtectedRoute, RequireUnauthenticated} from "./routes";

const App: React.FC = () => (
    <AuthProvider>
        <Navbar />
        <Routes>
            {/* Rutas de autenticación */}
            <Route
                path="/login"
                element={
                    <RequireUnauthenticated redirectTo="/">
                        <Login />
                    </RequireUnauthenticated>
                }
            />
            <Route
                path="/register"
                element={
                    <RequireUnauthenticated redirectTo="/">
                        <Register />
                    </RequireUnauthenticated>
                }
            />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute redirectTo="/login" />}>
                <Route path="/" element={<ProductListContainer />} />
                <Route path="/category" element={<ProductCategoryContainer />} />
                <Route path="/cart" element={<CartContainer />} />
            </Route>

            {/* Ruta por defecto para redirigir según el estado de autenticación */}
            <Route path="*" element={<DefaultRoute />} />
        </Routes>
    </AuthProvider>
);

export default App;
