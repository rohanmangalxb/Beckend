import { useEffect, useState } from 'react'
import axios from 'axios'
import OrderCard from '../components/OrderCard'

const MyOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get('/api/orders/my')
            setOrders(res.data)
        }
        fetchOrders()
    }, [])

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    )
}

export default MyOrders
