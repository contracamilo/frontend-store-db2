// src/components/ProductList/ProductList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductListView from './ProductListView';
import { Product } from '../../types/productTypes';

const mockProducts: Product[] = [
    { _id: '1', name: 'Producto A', category: 'Categoría 1', price: 10, stock: 5 },
    { _id: '2', name: 'Producto B', category: 'Categoría 2', price: 20, stock: 10 },
];

test('renders product list', () => {
    render(<ProductListView products={mockProducts} onAddToCart={() => {}} successMessage={"default"} /> );
    expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto B/i)).toBeInTheDocument();
});
