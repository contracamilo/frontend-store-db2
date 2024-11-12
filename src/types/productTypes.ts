// src/types/productTypes.ts

// src/types/productTypes.ts
export interface Product {
    _id: string; // Cambia esto si el identificador es `_id`
    name: string;
    category: string;
    price: number;
    stock: number;
    // otros campos...
}


export interface CartItem {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    user_id: string;
    items: CartItem[];
}

