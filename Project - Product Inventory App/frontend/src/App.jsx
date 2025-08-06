import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminProductList from './pages/AdminProductList';
import AddProduct from './pages/AddProduct';
import MyOrders from './pages/MyOrders';
import AllOrders from './pages/AllOrders';

function App() {

  return (
    <>

      <div>
        <div className="fixed inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
          <Toaster position="top-right" />
        </div>
      </div>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<PrivateRoute />} >
            <Route index element={<Dashboard />} />
            <Route path='/my-orders' element={<MyOrders />} />
          </Route>

          <Route path='/admin' element={<AdminRoute />}>
            <Route path="products" element={<AdminProductList />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
