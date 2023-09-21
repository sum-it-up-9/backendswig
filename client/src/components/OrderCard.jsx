
import { CDN_URL } from "../utils/constants.js";
import { useSelector } from "react-redux";


const OrderCard = (props) => {

    const orderedItems= useSelector(store=>store.user.items);
    const {resData}=props;
    console.log('ordercard',resData);

  
    return (
      <div className="flex flex-col gap-4">
        {orderedItems.length>0 && orderedItems.map(item=>(
          <div className='flex flex-col border-b-2 pb-4'>
            <div className="flex flex-wrap ">
              <div>
                <img
                  className="ml-6 w-10/12 mr-8 mt-1 h-40 rounded-md"
                  alt="res-logo"
                  src={CDN_URL + item?.OrderInfo?.data?.cloudinaryImageId}
                />
              </div>
              <div className="ml-6 flex flex-col">
                <div className="font-bold text-lg mt-2">{item?.OrderInfo?.data?.name}</div>
                <div className="flex  pt-4  ">
                {
                  item?.cartItems?.length>0 && item?.cartItems.map(cartItem=>(
                    <div className="flex items-center flex-nowrap gap-0"> {cartItem?.name}<i class="ri-close-line"></i>{cartItem?.quantity} , </div>
                  ))
                } 
                </div>
                <div className=" pt-4">Order Placed On: <b>{item?.Date}</b></div>
              
              
              </div>
            </div>
        </div>
        )) }
      </div>
    );
    
}

export default OrderCard
