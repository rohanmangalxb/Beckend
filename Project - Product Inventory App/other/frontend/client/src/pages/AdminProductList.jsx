import { useEffect, useState } from 'react'
import axios from 'axios'

const AdminProductList = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const res = await axios.get('/api/products')
        setProducts(res.data)
    }

    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/${id}`)
        fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">All Products</h2>
            {products.map((prod) => (
                <div
                    key={prod._id}
                    className="flex justify-between items-center p-4 border rounded bg-white"
                >
                    <div>
                        <h3 className="font-semibold">{prod.name}</h3>
                        <p>₹{prod.price} | Qty: {prod.quantity}</p>
                    </div>
                    <button
                        onClick={() => deleteProduct(prod._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default AdminProductList
