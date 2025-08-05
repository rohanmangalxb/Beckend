import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/users/login', form);
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
    };
    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}