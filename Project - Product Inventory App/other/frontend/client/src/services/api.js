import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Add token to every request if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers. Authorization = `Bearer ${token}`
  }
  return req
})

/* ------------------ Auth ------------------ */
export const registerUser = (data) => API.post('/users/register', data)
export const loginUser = (data) => API.post('/users/login', data)

/* ------------------ Products ------------------ */
export const getProducts = () => API.get('/products')
export const addProduct = (data) => API.post('/products', data)
export const updateProduct = (id, data) => API.put(`/products/${id}`, data)
export const deleteProduct = (id) => API.delete(`/products/${id}`)

/* ------------------ Orders ------------------ */
export const placeOrder = (productIds) => API.post('/orders', { productIds })
export const getAllOrders = () => API.get('/orders')
export const getMyOrders = () => API.get('/orders/my')
