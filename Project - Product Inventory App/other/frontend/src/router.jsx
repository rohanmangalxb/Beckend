import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminProductList from './pages/AdminProductList';
import AddProduct from './pages/AddProduct';
import MyOrders from './pages/MyOrders';
import AllOrders from './pages/AllOrders';
const router = createBrowserRouter([
    { path: '/', element: <Dashboard /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/admin/products', element: <AdminProductList /> },
    { path: '/admin/products/add', element: <AddProduct /> },
    { path: '/orders/my', element: <MyOrders /> },
    { path: '/orders', element: <AllOrders /> },
]);
export default router;