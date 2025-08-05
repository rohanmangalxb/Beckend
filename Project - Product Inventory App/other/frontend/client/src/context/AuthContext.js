import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    const login = (token) => {
        localStorage.setItem('token', token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        navigate('/login')
    }

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) setToken(savedToken)
    }, [])

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}