import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, settoken] = useState(localStorage.getItem('token') || null)

    const navigate = useNavigate();

    const login = (token) => {
        localStorage.setItem('token', token);
        settoken(token);
    }

    const logout = () => {
        localStorage.clear()
        settoken(null)
        navigate('/login')
    }

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) settoken(savedToken)
    }, [])

    return (
        <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
    )
}
