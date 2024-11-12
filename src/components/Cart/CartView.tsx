import React from 'react';
import styles from './Cart.module.css';
import { CartItem } from '../../types/productTypes';

interface CartViewProps {
    cartItems: CartItem[];
    onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onCheckout }) => {
    const groupedItems = cartItems.reduce((acc: CartItem[], item) => {
        const existingItem = acc.find(i => i.product_id === item.product_id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    const grandTotal = groupedItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className={styles.cart}>
            <h1>Carrito de Compras</h1>
            {groupedItems.length > 0 ? (
                <>
                    <ul className={styles.cartList}>
                        {groupedItems.map(item => (
                            <li key={item.product_id} className={styles.cartItem}>
                                <div>
                                    <b>{item.name}</b>
                                    <span>${item.price} x {item.quantity}und</span>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.grandTotal}>
                        <strong>Total: ${grandTotal.toFixed(2)}</strong>
                    </div>
                </>
            ) : (
                <p>Tu carrito está vacío</p>
            )}
            {groupedItems.length > 0 && (
                <button onClick={onCheckout} className={styles.checkoutButton}>Realizar Compra</button>
            )}
        </div>
    );
};

export default CartView;
