// src/components/ProductCategory/ProductCategoryContainer.tsx
import React, { useState } from 'react';
import { getProductsByCategory } from '../../api/api';
import ProductCategoryView from './ProductCategoryView';
import { Product } from '../../types/productTypes';

const ProductCategoryContainer: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Función para capitalizar la categoría
    const capitalizeCategory = (category: string): string => {
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    };

    const handleSearch = () => {
        setError(null); // Reinicia el mensaje de error al iniciar una búsqueda
        getProductsByCategory(capitalizeCategory(category))
            .then(response => {
                setProducts(response.data);
            })
            .catch(() => {
                setError('Error al cargar productos por categoría');
            });
    };

    return (
        <div className="main">
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <ProductCategoryView
                    category={category}
                    setCategory={setCategory}
                    products={products}
                    onSearch={handleSearch}
                    onAddToCart={() => {}}
                />
            )}
        </div>
    );
};

export default ProductCategoryContainer;
