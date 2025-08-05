import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
            <h1
                onClick={() => navigate('/dashboard')}
                className="text-xl font-bold cursor-pointer"
            >
                Inventory App
            </h1>
            <div className="space-x-4">
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <>
                                <Link to="/admin/products" className="hover:text-yellow-400">Products</Link>
                                <Link to="/admin/add-product" className="hover:text-yellow-400">Add Product</Link>
                                <Link to="/orders/all" className="hover:text-yellow-400">Orders</Link>
                            </>
                        )}
                        {user.role === 'user' && (
                            <>
                                <Link to="/dashboard" className="hover:text-yellow-400">Products</Link>
                                <Link to="/orders/my" className="hover:text-yellow-400">My Orders</Link>
                            </>
                        )}
                        <button
                            onClick={logout}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-yellow-400">Login</Link>
                        <Link to="/register" className="hover:text-yellow-400">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
