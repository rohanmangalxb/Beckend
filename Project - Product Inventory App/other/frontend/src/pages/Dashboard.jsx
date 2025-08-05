import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import OrderCard from '../components/OrderCard'


const Dashboard = () => {


    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="DashContainer w-[90%] m-auto my-10 ">

                <div className="bar bg-amber-200 my-5">

                    <div className='flex justify-between px-5 p-2'>
                        <span>Prodesk</span>

                        <div>
                            
                        </div>
                    </div>
                </div>

                <OrderCard/>

            </div>
        </>
    )
}

export default Dashboard
