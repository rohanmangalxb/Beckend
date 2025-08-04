// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />
    },

    {
      path: '/login',
      element: <Login />
    },

    {
      path: '/register',
      element: <Register />
    },

  ])

  return (
    <>
      <div>
        <div class="fixed inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
