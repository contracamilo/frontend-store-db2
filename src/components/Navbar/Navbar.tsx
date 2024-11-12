import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.module.css';

const Navbar: React.FC = () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate(0);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {isAuthenticated ? (<>
                <Link className="link" to="/">Inicio</Link>
                <Link className="link" to="/category">Categorías</Link>
                <Link className="link" to="/cart">Carrito</Link>
                <a onClick={handleLogout} aria-label="link">Cerrar Sesión</a>
            </>) : (
                <>
                    <Link className="link" to="/login">Iniciar Sesión</Link>
                    <Link className="link" to="/register">Registrarse</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
