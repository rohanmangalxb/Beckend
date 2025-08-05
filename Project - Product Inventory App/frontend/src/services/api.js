import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})


export const registerUser = (data) => API.post('/users/register', data)
export const loginUser = (data) => API.post('/users/login', data)

export const createProduct = (data) => API.post('/products/', data)
export const fetchProducts = () => API.get('/products/')
export const updateProduct = (data, id) => API.put(`/products/${id}`, data)
export const deleteProduct = (id) => API.delete(`/products/${id}`)

export const placeOrders = (data) => API.post('/orders/', data)
export const fetchAllOrders = (data) => API.get('/orders/', data)
export const fetchMyOrder = (data) => API.get('/orders/my', data)