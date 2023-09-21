import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrdersResCard from "../components/OrdersResCard";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const Orderslist=useSelector( (store) => store.order.items);
  console.log('orderlist',Orderslist);
  const navigate = useNavigate();
    

  const handleResPage = (id)=>{
    navigate(`/restaurant/${id}`);
}

  return (
    <div className="flex flex-col">
      {Orderslist.length>0 && <div className="ml-auto pl-6 mt-16 mr-auto md:w-8/12 10/12 font-bold text-3xl">Favorite Restaurants</div>}
      <div className="flex md:flex-row flex-col ml-auto mt-8 mr-auto md:w-8/12 10/12">
        {
          
          Orderslist.length>0 ? ( Orderslist.map((order,index)=>{
            return <div className="hover:shadow-2xl" key={index} onClick={() => handleResPage(order.data.id)}>
              <OrdersResCard   resData={order} />
            </div>
          }))   :(
            <div className='w-100% md:h-[calc(100vh-80px)] flex items-center flex-col justify-center my-0 mx-auto text-center'>
              <div className="w-96"><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" /></div>
              <div className='mt-6 text-base font-semibold'>Your Favorite List is Empty</div>
              <div className='mt-2'>You can go to restaurant page to add more restaurants</div>
              <div className='mt-7 py-3 px-5 capitalize bg-[#fc8019] text-white font-semibold cursor-pointer text-base text-center border-0 outline-0'><Link to='/res'>See Restaurants Near You</Link></div>
            </div>
          )
         
        }
      </div>
    </div>
  )
}

export default Orders
