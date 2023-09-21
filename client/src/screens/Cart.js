import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {AddToCart, RemoveFromCart, ClearCart } from "../utils/CartSlice";
import { AddCurrentOrder } from '../utils/UserSlice';
import symbolImage from './t.png';
import AddressEdit from '../components/AddressEdit';

const Cart = () => {
  const cartItems=useSelector( (store) => store.cart.items);
  const email=useSelector( (store) => store.user.email);
  const resId=useSelector( (store) => store.cart.resId);
  const isLoggedin=useSelector( (store) => store.user.isLoggedin);
  const [edited,setEdited]=useState(false);
  const [address,setAddress]=useState('S No. 207, Phoenix Marketcity, Viman Nagar Rd, Clover Park, Viman Nagar, Pune, Maharashtra 411014')
  let [TotalPrice]=useState(0);
  console.log(cartItems);

  const dispatch=useDispatch();

  async function handleAddItem(item){
    console.log('indie');
    dispatch(AddToCart({item,resId}));
  }

  async function handleRemoveItem(item){
    dispatch(RemoveFromCart(item));
  }

  const handleTapToPay = async () => {
    if(!isLoggedin){
      alert('Please log in to continue!')
      return;
    }
    try {
      const orderData = {
        cartItems: cartItems, // Pass the cartItems data
        email:email
      };
      console.log('od',orderData);
      // Make an API POST request to store the order
      const response = await axios.post('http://localhost:5000/orders', orderData);
  
      // Check the response for success or handle any errors
      if (response.status === 200) {
        // Order was successfully placed, display a success message to the user
        alert('Order placed successfully');
        dispatch(ClearCart());
        const OrderInfo=response?.data?.OrderInfo;
        console.log('odres',response);
        dispatch(AddCurrentOrder({cartItems,OrderInfo}));
        console.log(response);
      } else {
        // Handle any errors and display an error message
        alert('Error placing order: ' + response.data.error);
      }
    } catch (error) {
      // Handle any network or other errors and display an error message
      alert('An error occurred: ' + error.message);
    }
  };


  return (
    <>
    {
      edited &&  <AddressEdit setAddress={setAddress} setEdited={setEdited}/> 
    }  
    <div className={`body-container ${edited ? 'blur' : ''}  flex flex-wrap justify-center  bgc h-screen `}>
       
     
      <div className='  w-full md:w-1/2 mx-7 my-10 flex flex-col gap-8'>
        <div className='flex flex-col pt-5 bg-white'>
          <div className='flex '>
            <div className='font-bold pl-10 py-2'>Delivery address</div>
            <div className='pl-2 py-2'><img className='h-5 w-5 pt-1' src={symbolImage} alt="symbol" /></div>
            <div className='ml-auto py-2 pr-16'><button className='text-orange-500 font-semibold' onClick={()=>setEdited(true)}>CHANGE</button></div>
          </div>
          <div className='font-semibold pl-10 pt-4'>Home</div>
          <div className='pl-10 mt-2 text-gray-500 text-sm'>{address}</div>
          <div className='font-semibold pl-10 py-8'>36 mins</div>
        </div>
        <div className='h-20 shadow-lg bg-white pl-10 flex items-center'>
       {
        cartItems.length>0 ? 
       
          <div className=' '>
            <button onClick={handleTapToPay} className='font-bold transform transition-transform hover:scale-110 px-2 py-2 bg-blue-950 rounded-md text-white'>Tap to Pay</button>
          </div>
      
        
        : <div>Payment Mode</div>
       }
        
        </div> 
      </div>

      
      <div className='shadow-lg md:w-1/3 w-11/12 mt-10 h-min pb-3  bg-white'>
        <ul className='m-2  '>
        {
          cartItems.length>0 &&   cartItems.map((item,index)=>{
            let itemPrice = item.quantity * item.price;
            TotalPrice+=itemPrice;
            return <li className='m-5 flex flex-wrap' key={index}>
              <div className='w-48'>{item.name} </div>
              <div className=' w-20 border border-gray-300 rounded-sm'>
                <button className='ml-3 mb-1 text-gray-500'  onClick={()=>{ handleRemoveItem(item)}}>–</button>
                <input className='ml-3 mb-1 w-4 text-green-600 font-semibold text-sm' value={item.quantity} readOnly /> 
                <button className='ml-2 mb-1 text-green-600 font-semibold' onClick={()=>{ handleAddItem(item)}}>+ </button>
              </div>
              <div className='xl:ml-auto  pl-2'>₹{itemPrice}</div>
              </li>
          })
        }
        </ul>
        <div className='border-b border-gray-200 mx-7'></div>
        <div className='flex flex-col '>
          <div className='font-semibold text-sm mx-7 my-3'>Bill Details</div>
          
          <div className='flex flex-wrap'>
            <div className=' font-family pt-6 text-sm pl-7 '>Item Total </div>
            <div className='md:ml-auto pl-10 pt-6 md:pr-4'>₹{TotalPrice}</div>
          </div>
          
          <div className='flex flex-wrap'>
            <div className=' font-family text-sm pl-7 pt-4'>Delivery fee</div>
            <div className='md:ml-auto pl-7 txt-custom pt-4 md:pr-4 text-sm'><strike>₹39.00</strike>FREE</div>
          </div>

          <div className='mx-6 mt-6 border border-black'></div>

          <div className='flex flex-wrap '>
            <div className='pl-7 font-bold pt-2'>To Pay</div>
            <div className='md:ml-auto ml-1 md:pr-4 pt-2'>₹{TotalPrice}</div>  
          </div>
        </div>
     
      </div>
      
      
    </div>
    </>
  )
}

export default Cart
