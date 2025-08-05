import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import AdminProductList from './pages/AdminProductList'
import MyOrders from './pages/MyOrders'
import AllOrders from './pages/AllOrders'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin-only routes */}
          <Route path="/admin/products" element={
            <PrivateRoute role="admin">
              <AdminProductList />
            </PrivateRoute>
          } />
          <Route path="/admin/add" element={
            <PrivateRoute role="admin">
              <AddProduct />
            </PrivateRoute>
          } />
          <Route path="/admin/orders" element={
            <PrivateRoute role="admin">
              <AllOrders />
            </PrivateRoute>
          } />

          {/* User-only route */}
          <Route path="/myorders" element={
            <PrivateRoute role="user">
              <MyOrders />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
