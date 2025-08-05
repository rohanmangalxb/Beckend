import React from 'react'

const MyOrders = () => {
    return (
        <>
            <div className='orderCard'>

                <div className='font-bold text-2xl w-full'>Your Orders</div>

                <div className="searchbar mt-2 flex justify-between items-stretch  border-t-1 border-t-gray-400 border-b-gray-400 border-b-1 mb-5">
                    <div className="flex gap-4 px-4 w-full items-stretch">
                        <div className="icon flex items-center">
                            <img width="30px" src="icons/search.jpg" alt="search" />
                        </div>
                        <input
                            className="w-full h-full px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="orders"
                            id="orders"
                            placeholder="Search All Orders"
                        />
                    </div>

                    <div className="filter px-4 py-2 bg-gray-200 rounded flex items-center justify-center cursor-pointer">
                        Filter
                    </div>
                </div>


                <div className="orderList flex flex-col gap-5">
                    <div className="prodCard flex  p-2 border-t-1 border-t-gray-400 border-b-gray-400 border-b-1">
                        <div className='p-1 w-40 h-40 flex justify-center items-center'>
                            <img className='shadow-blue-300 shadow-2xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UtekBF2OHTxfnDj4RuFNOtcDHHysCq8o7g&s" alt="image" />
                        </div>

                        <div className="details flex flex-col p-1 px-5 justify-evenly">
                            <div>

                                <span className='font-bold'>name</span>
                                {/* <span className='font-bold'>{order.name}</span> */}

                                <div className='flex gap-2 text-gray-700 text-sm'>
                                    <span>price</span>
                                    {/* <span>{order.price}</span> */}
                                    {/* <span className='line-through'>29.00$</span> */}
                                </div>

                                <div>
                                    <span className='text-sm font-bold text-gray-700'>Status: </span>
                                    <span className='text-sm'>Pending</span>
                                    {/* <span className='text-sm'>{order.status}</span> */}
                                </div>

                                <div>
                                    <span className='text-sm font-bold text-gray-700'>Delivery By: </span>
                                    <span className='text-sm'>Sunday</span>
                                </div>
                            </div>
                            <span className='rounded-lg bg-amber-500 text-center cursor-pointer mt-3'>Shop now</span>
                        </div>
                    </div>


                </div>


            </div>


            {/* <AllOrders/> */}
        </>
    )
}

export default MyOrders
