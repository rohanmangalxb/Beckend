import React from 'react';
export default function OrderCard({ order }) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-bold">Order ID: {order._id}</h3>
      <p>Status: {order.status}</p>
    </div>
  );
}