import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AllOrders from './pages/AllOrders'
import PrivateRoute from './routes/PrivateRotue'
import AddProduct from './pages/AddProduct'
import AdminProductList from './pages/AdminProductList'
import MyOrders from './pages/MyOrders'

function App() {

  return (
    <>

      <div>
        <div className="fixed inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>


      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/admin/products' element={
              <PrivateRoute role={'admin'}>
                <AdminProductList />
              </PrivateRoute>
            } />
            <Route path='/admin/add' element={
              <PrivateRoute role={'admin'}>
                <AddProduct />
              </PrivateRoute>
            } />
            <Route path='/admin/orders' element={
              <PrivateRoute role={'admin'}>
                <AllOrders />
              </PrivateRoute>
            } />

            <Route path='/myorders' element={
              <PrivateRoute role={'user'}>
                <MyOrders />
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
