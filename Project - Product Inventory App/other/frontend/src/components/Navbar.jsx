import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
            <Link to="/">Inventory</Link>
            <div className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}