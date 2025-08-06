import { useState } from "react";
import api from "../services/api";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const verifyToken = async (token) => {
        setLoading(true);
        try {
            if (!token) throw new Error('No token provided');
            console.log("token: ",token)
            const decoded = jwtDecode(token);

            console.log("decoded: ", decoded)
            if (decoded.exp < Date.now() / 1000) {
                throw new Error('Token expired');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const { data } = await api.get('/auth/me');

            console.log("data: ", data)
            console.log("data upd: ", data.data)
            setUser({data});

            console.log('user: ', user)
            return true;
        } catch (err) {
            localStorage.removeItem('token');
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });

            if (!data?.token) {
                throw new Error('No token received');
            }

            localStorage.setItem('token', data.token);
            const verified = await verifyToken(data.token);
            return verified;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const initAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) await verifyToken(token);
    };

    return { user, loading, error, login, initAuth };
};

export default useAuth;
