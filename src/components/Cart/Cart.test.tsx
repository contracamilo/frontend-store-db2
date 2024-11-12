// src/components/Cart/Cart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CartView from './CartView';

const mockCartItems = [
    { product_id: '1', name: 'Producto A', price: 10, quantity: 2 },
    { product_id: '2', name: 'Producto B', price: 20, quantity: 1 },
];

test('renders cart items and checkout button', () => {
    render(<CartView cartItems={mockCartItems} onCheckout={() => {}} />);
    expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto B/i)).toBeInTheDocument();
    expect(screen.getByText(/Realizar Compra/i)).toBeInTheDocument();
});
