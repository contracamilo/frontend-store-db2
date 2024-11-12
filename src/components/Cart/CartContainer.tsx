// src/components/Cart/CartContainer.tsx
import React, { useEffect, useState } from 'react';
import { getCart, checkout } from '../../api/api';
import CartView from './CartView';
import { CartItem } from '../../types/productTypes';

const CartContainer: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para indicar carga

    useEffect(() => {
        getCart()
            .then(response => {
                if (response.data) {
                    setCartItems(response.data.items || []);
                }
                setIsLoading(false); // Desactivar el estado de carga
            })
            .catch(() => {
                setError('No hay productos en el carro');
                setIsLoading(false); // Desactivar el estado de carga en caso de error
            });
    }, []);

    const handleCheckout = () => {
        checkout()
            .then(response => {
                if (response.data) {
                    alert(response.data.message);
                    setCartItems([]); // Vaciar el carrito después de la compra
                }
            })
            .catch(() => setError('Error al realizar la compra'));
    };

    // Muestra un mensaje amigable si el carrito está vacío
    if (!isLoading && cartItems.length === 0 && !error) {
        return (
            <div className="main">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para verlos aquí.</p>
            </div>
        );
    }

    // Muestra un mensaje de error si hubo un error en la solicitud
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Muestra un mensaje de carga mientras los datos están siendo obtenidos
    if (isLoading) {
        return <div className="loading">Cargando carrito...</div>;
    }

    // Renderiza la vista del carrito cuando hay productos
    return <CartView cartItems={cartItems} onCheckout={handleCheckout} />;
};

export default CartContainer;
