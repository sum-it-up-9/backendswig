import React from 'react';
import { useSelector } from "react-redux";
import OrderCard from '../components/OrderCard';
import { Link } from 'react-router-dom';

const MyOrders = () => {

  const Orderslist=useSelector( (store) => store.user.items);

  const handleResPage=()=>{

  }

  return (
    <div className="flex flex-col ">
    {Orderslist.length > 0 && (
      <div className="ml-auto pl-6 mt-16 mr-auto md:w-8/12 w-10/12 font-bold text-3xl">PAST ORDERS</div>
    )}
    <div className="flex md:flex-row flex-col ml-auto mt-8 mr-auto md:w-8/12 w-10/12">
      {Orderslist.length > 0 ? (
        <div className="shadow-2xl pt-4 pr-4">
          <OrderCard resData={Orderslist} />
        </div>
      ) : (
        <div className='w-100% md:h-[calc(100vh-80px)] flex items-center flex-col justify-center my-0 mx-auto text-center'>
          <div className="w-96"><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" /></div>
          <div className='mt-6 text-base font-semibold'>You haven't placed any order yet!</div>
          <div className='mt-2'>You can go to home page to place orders</div>
          <div className='mt-7 py-3 px-5 capitalize bg-[#fc8019] text-white font-semibold cursor-pointer text-base text-center border-0 outline-0'><Link to='/res'>See Restaurants Near You</Link></div>
        </div>
      )}
    </div>
  </div>
  )
}

export default MyOrders
