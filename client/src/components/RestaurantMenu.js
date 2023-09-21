import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";
import { AddToCart,AddResId } from "../utils/CartSlice";

const RestaurantMenu= () =>{
    //read dynamic URL parameters
    // how to read the dynamic url
    const params  = useParams();
    const pid=params.id;
    const resId=useSelector( (store) => store.cart.resId);
    const cartCount=useSelector( (store) => store.cart.cartCount);
    const isLoggedin=useSelector( (store) => store.user.isLoggedin);
    const [itemQuantities, setItemQuantities] = useState({});
    console.log(pid,'pid');
    const [restaurants,setRestaurants]=useState(null);
    const [resmenu, setResMenu] = useState([{}]);
    const userEmail = localStorage.getItem('userEmail');

    const dispatch=useDispatch();

    useEffect(()=>{
        getRestaurantInfo()
    },[]);

    

    async function getRestaurantInfo(){
        const data = await fetch("http://localhost:5000/menu/" + pid);
        const resdata=await fetch(""+pid);
        const json= await data.json();
        if(resId===0 || cartCount===0 ){
          dispatch(AddResId(json.data.id));
        }
        setRestaurants(json.data.menu);
        setResMenu(json.data.menu);
    }

    async function handleAdditem(item){

      if(!isLoggedin){
        alert('Please Login to continue');
        return;
      }

      if( resId.toString() !== pid){
        alert('You alredy have added items from other restaurant in your cart, Clear cart if you want to order from here!');
        return;
      }
      const itemId=item.id;
      setItemQuantities({
        ...itemQuantities,
        [itemId]:itemQuantities[itemId]? itemQuantities[itemId]+1:1
      })

      dispatch(AddToCart({item,resId}));

      const reqBody = {
        item: item,
        email:userEmail
      };
    
      try {
        const response = await fetch('http://localhost:5000/addtocart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody)
        });
        console.log(response);
        // Handle the response if needed
        // ...
      } catch (error) {
        // Handle the error
        console.log(error);
      }
    }


    
    return !restaurants ? (
        <Shimmer />
      ) : (
        <>
        <div className="bg-custom h-64 flex justify-center items-center">
          <div className="h-2/3">
            <img className="h-full" src="https://swiggy-foodlovers.netlify.app/static/media/offerImg.795b296845a8a6cb6dea.jpg"></img>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="flex flex-col">
          
            {resmenu.map((item, index) => (
              <div key={index} className="flex border-t border-gray-300 mb-3">
                <div className="w-7/12  mt-4 mr-8" key={index}>
                  <div className="ml-5 pt-7 font-bold">{item.name}</div>
                  <div className="ml-5">₹{item.price}</div>
                  <div className="ml-5 custom-gray-color pt-3">Classic Indian dish made of juicy chicken in a buttery, mildly spiced gravy with cream</div>
                </div>

                <div className="mr-3 ml-auto bg-white">
                  <img className="h-20 w-28 mt-8 " src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/e0f07ee41f005c6a7237a54c3eeee732" alt="resimg"></img>
                  {itemQuantities[item.id] ? (
                    <div className="flex justify-center mt-2">
                      <button className="mr-2" onClick={() => setItemQuantities({...itemQuantities, [item.id]: itemQuantities[item.id] > 0 ? itemQuantities[item.id] - 1 : 1})}>-</button>
                      <input className="w-2 text-green-600"  value={itemQuantities[item.id]} readOnly/>
                      <button className="ml-1" onClick={() => handleAdditem(item)}>+</button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                       <button className=" text-green-600 font-semibold " onClick={() => handleAdditem(item)}>ADD</button>
                    </div>
                   
                  )}
                </div>
              </div>
            ))}
           
          </div>

        </div>
        </>
      );
};

export default RestaurantMenu;
