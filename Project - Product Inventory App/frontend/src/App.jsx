import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AllOrders from './pages/AllOrders'
import { cardContext } from './context/context'

function App() {
  const [card, setCard] = useState('prod')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />

    },

    {
      path: '/orders',
      element: <AllOrders />
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
      <cardContext.Provider value={{card, setCard}}>

        <div>
          <div className="fixed inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        </div>
        <RouterProvider router={router} />
      </cardContext.Provider>
    </>
  )
}

export default App
