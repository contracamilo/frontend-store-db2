// src/components/ProductCategory/ProductCategoryView.tsx
import React from 'react';
import styles from './ProductCategory.module.css';
import { Product } from '../../types/productTypes';

interface ProductCategoryViewProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    products: Product[];
    onSearch: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductCategoryView: React.FC<ProductCategoryViewProps> = ({
                                                                     category,
                                                                     setCategory,
                                                                     products,
                                                                     onSearch,
                                                                     onAddToCart,
                                                          }) => (
    <div className="main">
        <h1>Buscar Productos por Categoría</h1>
        <div className={styles.categorySearch}>
            <div className="form">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Categoría"
                    className={styles.input}
                />
                <button onClick={onSearch} className={styles.searchButton}>Buscar</button>
            </div>
            {Boolean(products.length)  && (<ul className="categoryList">
                {products.map(product => (
                    <li key={product._id} className={styles.productItem}>
                        <span>{product.name} - ${product.price} </span>
                        <button onClick={() => onAddToCart(product)} className={styles.addButton}>Agregar</button>
                    </li>
                ))}
            </ul>)}
        </div>
    </div>
);

export default ProductCategoryView;
