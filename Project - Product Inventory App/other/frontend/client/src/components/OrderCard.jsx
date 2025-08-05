const OrderCard = ({ order }) => {
  return (
    <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition-all">
      <h2 className="font-semibold">Order #{order._id}</h2>
      <p className="text-gray-600">Product: {order.product.name}</p>
      <p>Quantity: {order.quantity}</p>
      <p className="text-sm text-gray-500">Status: {order.status}</p>
      <p className="text-xs text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default OrderCard
