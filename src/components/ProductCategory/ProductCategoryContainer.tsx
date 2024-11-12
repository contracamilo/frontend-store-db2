import React, { useState } from 'react';
import {addToCart, getProductsByCategory} from '../../api/api';
import ProductCategoryView from './ProductCategoryView';
import { Product } from '../../types/productTypes';

const ProductCategoryContainer: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const handleAddToCart = (product: Product) => {
        addToCart({
            product_id: product._id,
            quantity: 1,
        })
            .then(response => {
                setSuccessMessage(`Una unidad de ${product.name} ha sido agregado al carrito!`);
                setTimeout(() => setSuccessMessage(null), 4000);
            })
            .catch(() => {
                setError('Error al agregar el producto al carrito');
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
                    onAddToCart={handleAddToCart}
                    successMessage={successMessage}
                />
            )}
        </div>
    );
};

export default ProductCategoryContainer;
