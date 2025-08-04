import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className='flex justify-between bg-black text-white h-13 items-center p-1'>
            <div className="logo px-5 font-bold text-lg">
                <NavLink to={'/'}>Prodesk</NavLink>
            </div>

            <div className="searchBar bg-white">
                <input type="text" />
            </div>

            <div className="userOptions flex gap-5 px-4">
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
