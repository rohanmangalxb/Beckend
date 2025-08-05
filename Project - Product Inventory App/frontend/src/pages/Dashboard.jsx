import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import MyOrders from './MyOrders'
import { useContext } from 'react'
import { cardContext } from '../context/context'

const Dashboard = () => {
    const cardVal = useContext(cardContext)

    return (
        <>
            <Navbar />

            <div className="DashContainer w-[95%] m-auto my-10">
                {cardVal.card === 'product' ? (
                    <ProductCard />
                ) : cardVal.card === 'orders' ? (
                    <MyOrders />
                ) : (
                    <div className="w-full bg-white rounded-xl shadow-md p-8 text-gray-800 animate-fade-in">
                        <h2 className="text-3xl font-bold mb-4">Welcome to <span className="text-blue-600">Prodesk</span></h2>
                        <p className="text-lg mb-6">
                            Get started by managing your <span className="font-semibold">Products</span> or checking your <span className="font-semibold">Orders</span>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div
                                onClick={() => cardVal.setCard('product')}
                                className="p-6 bg-slate-100 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-slate-200 group"
                            >
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Manage Products</h3>
                                <p className="text-sm text-gray-600">Add, edit, or delete your inventory items.</p>
                            </div>

                            <div
                                onClick={() => cardVal.setCard('orders')}
                                className="p-6 bg-slate-100 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-slate-200 group"
                            >
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Track Orders</h3>
                                <p className="text-sm text-gray-600">View and manage your customer orders.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
