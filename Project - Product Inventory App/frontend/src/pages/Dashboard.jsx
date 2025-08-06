import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import api from '../services/api'

const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('products') // 'products' or 'orders'
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Handle different API response structures
                const productsData = response.data?.data || response.data || [];
                setProducts(Array.isArray(productsData) ? productsData : []);
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <>
            <Navbar />

            <div className="DashContainer w-[95%] m-auto my-10">
                <div className="w-full bg-white rounded-xl shadow-md p-8 text-gray-800 animate-fade-in">
                    <h2 className="text-3xl font-bold mb-4">Welcome to <span className="text-blue-600">Prodesk</span></h2>
                    <p className="text-lg mb-6">
                        Get started by managing your <span className="font-semibold">Products</span> or checking your <span className="font-semibold">Orders</span>.
                    </p>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
                        <div
                            onClick={() => setActiveTab('products')}
                            className={`p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer group ${activeTab === 'products'
                                ? 'bg-blue-100 border border-blue-300'
                                : 'bg-slate-100 hover:bg-slate-200'
                                }`}
                        >
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Manage Products</h3>
                            <p className="text-sm text-gray-600">Add, edit, or delete your inventory items.</p>
                        </div>

                        <div
                            onClick={() => setActiveTab('orders')}
                            className={`p-6 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer group ${activeTab === 'orders'
                                ? 'bg-blue-100 border border-blue-300'
                                : 'bg-slate-100 hover:bg-slate-200'
                                }`}
                        >
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Track Orders</h3>
                            <p className="text-sm text-gray-600">View and manage your customer orders.</p>
                        </div>
                    </div> */}

                    {activeTab === 'products' && (
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Products</h3>
                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No products available
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard