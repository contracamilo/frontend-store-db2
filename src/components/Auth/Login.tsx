// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as loginUser } from '../../api/api';
import './Auth.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos
        try {
            const response = await loginUser(email, password);
            console.log('Login Response:', response); // Verifica la respuesta

            const token = response.access_token; // Extrae el token de la respuesta
            if (token) {
                login(token); // Llama a login en el contexto para actualizar el estado de autenticación
                navigate('/'); // Redirige al inicio después de iniciar sesión
            } else {
                setError('Error al procesar la autenticación.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <div className="auth-link">
                ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </div>
        </div>
    );
};

export default Login;
