import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../../api/api';
import ProductListView from './ProductListView';
import { Product } from '../../types/productTypes';

const ProductListContainer: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data);
            })
            .catch(() => {
                setError('Error al cargar productos');
            });
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart({
            product_id: product._id,
            quantity: 1,
        })
            .then(response => {
                setSuccessMessage(`Una unidad de ${product.name} ha sido agregado al carrito!`);
                setTimeout(() => setSuccessMessage(null), 4000); // Limpia el mensaje de éxito después de 4 segundos
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
                <ProductListView
                    products={products}
                    onAddToCart={handleAddToCart}
                    successMessage={successMessage}
                />
            )}
        </div>
    );
};

export default ProductListContainer;
