import React from 'react';
export default function ProductCard({ product }) {
    return (
        <div className="border rounded p-4">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
    );
}