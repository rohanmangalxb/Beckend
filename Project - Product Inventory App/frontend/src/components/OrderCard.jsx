// import React from 'react'
// import AllOrders from '../pages/AllOrders'

// const OrderCard = () => {
//   return (
//     <>
//       <div className="orderCard">
//         <div>Order Details:</div>

//         <div className='prodContainer'>
//           <table className=' w-full'>

//             <thead className='text-left bg-amber-600'>
//               <tr>
//                 <th className='px-5'>Product Name</th>
//                 <th className='px-5'>Quantity</th>
//                 <th className='px-5'>Price</th>
//                 {/* <th className='border-1'></th> */}
//               </tr>
//             </thead>

//             <tbody>
//               <tr className='border-b-1 border-b-gray-400 py-5 mb-5'>
//                 <td className='px-5 flex gap-5 p-2'><img width={'100px'} className=' rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UtekBF2OHTxfnDj4RuFNOtcDHHysCq8o7g&s" alt="image" /> Laptop</td>
//                 <td className='px-5'>x2</td>
//                 <td className='px-5'>$49999</td>
//               </tr>
//               <tr className='border-b-1 border-b-gray-400 py-5 mb-5'>
//                 <td className='px-5 flex gap-5 p-2'><img width={'100px'} className=' rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UtekBF2OHTxfnDj4RuFNOtcDHHysCq8o7g&s" alt="image" /> Laptop</td>
//                 <td className='px-5'>x2</td>
//                 <td className='px-5'>$49999</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="orderSummary">
//             <div className='flex gap-50 mt-20'>
//               <span className='font-bold'>Order Summary:</span>

//               <div className='w-1/5 flex flex-col gap-2'>
//                 <div className='flex justify-between '>
//                   <span className='text-gray-600'>Total items:</span>
//                   <span>5</span>
//                 </div>
//                 <div className='flex justify-between '>
//                   <span className='text-gray-600'>Subtotal:</span>
//                   <span>$2999</span>
//                 </div>
//                 <div className='flex justify-between '>
//                   <span className='text-gray-600'>Shipping Fee:</span>
//                   <span>$29</span>
//                 </div>
//                 <div className='flex justify-between '>
//                   <span className='text-gray-600'>Tax:</span>
//                   <span>$42</span>
//                 </div>
//                 <div className='flex justify-between border-b-1 border-b-gray-400'>
//                   <span className='text-gray-600'>Total:</span>
//                   <span>$3070</span>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default OrderCard

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 font-bold">Total: ${order.totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderCard;