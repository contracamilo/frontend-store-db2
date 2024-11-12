// src/components/ProductCategory/ProductCategory.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCategoryView from './ProductCategoryView';
import { Product } from '../../types/productTypes';

const mockProducts: Product[] = [
    { _id: '1', name: 'Producto A', category: 'Categoría 1', price: 10, stock: 5 },
];

test('renders search input and products', () => {
    render(
        <ProductCategoryView
            category=""
            setCategory={() => {}}
            products={mockProducts}
            onSearch={() => {}}
            onAddToCart={() => {}}
            successMessage={""}
        />
    );

    expect(screen.getByPlaceholderText(/Categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
});

test('calls onSearch when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(
        <ProductCategoryView
            category="test"
            setCategory={() => {}}
            products={[]}
            onSearch={handleSearch}
            onAddToCart={() => {}}
            successMessage={""}
        />
    );

    fireEvent.click(screen.getByText(/Buscar/i));
    expect(handleSearch).toHaveBeenCalled();
});
