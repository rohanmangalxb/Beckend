import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
// import { useState } from 'react'

const Navbar = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className='flex justify-between bg-black text-white h-13 items-center p-1'>
            <div className="logo px-5 font-bold text-lg">
                <NavLink to={'/'}>Prodesk</NavLink>
            </div>
            <div className='w-2/3 flex justify-between items-center gap-4'>
                <div className="searchBar bg-slate-700 w-full rounded-2xl p-1 flex items-center h-10">
                    <input
                        className='w-full h-full px-5 py-2 rounded-xl bg-slate-700 text-white placeholder-gray-300 focus:outline-none'
                        type="text"
                        placeholder='Search items'
                    />
                </div>

                <div className="flex gap-10">
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <NavLink to="/admin/products" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">
                                    Admin Dashboard
                                </NavLink>
                            )}
                            <NavLink to="/my-orders" className="w-[80px]">
                                My Orders
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-200 transition duration-300">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

            </div>


            <div className="userOptions flex gap-5 px-4">
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
