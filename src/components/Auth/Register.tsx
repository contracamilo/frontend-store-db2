import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/api';
import './Auth.css';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Crear instancia de navigate
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            setError(null); // Limpiar cualquier error anterior
            setSuccess('Registro exitoso. Redirigiendo al inicio de sesión...');

            // Redirigir a la página de login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError('Error en el registro');
            setSuccess(null);
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Registrarse</button>
            </form>
            <div className="auth-link">
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
            </div>
        </div>
    );
};

export default Register;
