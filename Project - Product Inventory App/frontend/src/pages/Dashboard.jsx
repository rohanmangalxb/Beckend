import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import OrderCard from '../components/OrderCard'


const Dashboard = () => {

    const [cardVal, setCardVal] = useState('product')

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="DashContainer w-4/5 m-auto my-10 ">

                <div className="bar bg-amber-200 my-5">

                    <div className='flex justify-between px-5 p-2'>
                        <span>Prodesk</span>

                        <div>
                            <ul className='flex gap-10'>
                                <li className='cursor-pointer' onClick={() => setCardVal('product')}>Products</li>
                                <li className='cursor-pointer' onClick={() => setCardVal('orders')}>Orders</li>
                                <li className='cursor-pointer' >Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    {cardVal === 'product' ?
                        <ProductCard /> :
                        <OrderCard />
                    }
                </div>

            </div>
        </>
    )
}

export default Dashboard
