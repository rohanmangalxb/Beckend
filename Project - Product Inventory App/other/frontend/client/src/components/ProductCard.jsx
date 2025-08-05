const ProductCard = ({ product }) => {
    return (
        <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition-all">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
        </div>
    )
}

export default ProductCard
