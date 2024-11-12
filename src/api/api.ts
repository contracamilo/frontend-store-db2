// src/api/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtener el token JWT como una cadena
        console.log(localStorage.getItem('token'));  // Debe mostrar una cadena similar a "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Authorization Header:', config.headers.Authorization); // Verificar el encabezado
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => Promise.reject(error)
);

// Función de login
export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const token = response.data.access_token;
    localStorage.setItem('token', token); // Guarda el token en localStorage
    return response.data;
};

// Función de registro
export const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/register', { name, email, password });
    return response.data;
};

// Funciones de productos y carrito (actualizadas para JWT)
export const getProducts = () => api.get('/products');
export const getProductsByCategory = async (category: string) => api.get(`/products/${category}`);
export const addToCart = (item: { product_id: string; quantity: number }) =>
    api.post('/cart', item);
export const getCart = async () => api.get('/cart');
export const checkout = async () => api.post('/checkout');
