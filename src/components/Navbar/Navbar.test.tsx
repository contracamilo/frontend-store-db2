import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

test('renders navbar links', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText(/Productos/i)).toBeInTheDocument();
    expect(getByText(/Categoría/i)).toBeInTheDocument();
    expect(getByText(/Carrito/i)).toBeInTheDocument();
});
