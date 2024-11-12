// src/components/Cart/CartContainer.tsx
import React, { useEffect, useState } from 'react';
import { getCart, checkout } from '../../api/api';
import CartView from './CartView';
import { CartItem } from '../../types/productTypes';

const CartContainer: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCart()
            .then(response => {
                if (response.data) {
                    setCartItems(response.data.items || []);
                }
            })
            .catch(() => setError('Error al cargar el carrito'));
    }, []);

    const handleCheckout = () => {
        checkout()
            .then(response => {
                if (response.data) {
                    alert(response.data.message);
                    setCartItems([]);
                }
            })
            .catch(() => setError('Error al realizar la compra'));
    };

    if (error) {
        return <div>{error}</div>;
    }

    return <CartView cartItems={cartItems} onCheckout={handleCheckout} />;
};

export default CartContainer;
