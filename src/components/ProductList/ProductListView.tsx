import React from 'react';
import styles from './ProductList.module.css';
import { Product } from '../../types/productTypes';
import placeholder from "../../assets/placeholder.png";

interface ProductListViewProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    successMessage: string | null;
}

const ProductListView: React.FC<ProductListViewProps> = ({ products, onAddToCart, successMessage }) => (
    <div>
        <div className="main">
            <h1>Catalogo de productos</h1>
            {successMessage && <div className="successMessage">{successMessage}</div>}
            <ul  className={styles.productList}>
                {products.map(product => (
                    <li key={product._id} className={styles.productItem}>
                        <div>
                        <img src={placeholder} alt="image placeholder"/>
                            <div className="productInfo">
                                <h3>{product.name} </h3>
                                <span>Precio: <b>${product.price}</b> </span>
                                <span>Stock: <b>{product.stock}</b> </span>

                                <i>{product.category}</i>
                                <button onClick={() => onAddToCart(product)} className={styles.addButton}>Agregar al
                                    Carrito
                                </button>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default ProductListView;
