import React,{ useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import swig from '../utils/images/swig.jpeg';
import Swiggy_Logo  from '../utils/images/Swiggy_Logo.png';
import { useSelector } from "react-redux";
import Footer from '../components/Footer';
import first  from '../utils/images/first.jpg';
import second  from '../utils/images/second.jpg';
import third  from '../utils/images/third.jpg';

const SignIn = () => {
  const[email,Setemail]=useState("");
  const[password,Setpassword]=useState("");
  const navigate = useNavigate();
 

 

  const backgroundImageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq';


  return (
    <div>
      <div className='flex md:flex-row flex-col md:gap-0 gap-8'>
         
          <div className='flex md:w-1/2 w-full h-full flex-col md:pl-20 pl-cust-vw'> 
            <div className='flex flex-wrap md:gap-18 gap-10 items-center'>
              <img src={Swiggy_Logo} className='w-1/3 mt-10' alt='sg'></img>
              <div className=' mt-10'>
                <button  className='font-bold px-2 h-8 bg-black rounded-md text-white md:text-base '>Hey Foodie</button>
              </div>
            </div>
            <div className='heading-size-cust mt-4  md:vw-text font-bold'>
              Cooking Gone Wrong?
            </div>
            <div className='pt-0'>
              <div className='flex flex-wrap md:text-2xl txt-clr-custom home-font-cust text-size-cust'>Order food from favourite restaurants near you.</div>
            </div>

            <div className='flex pt-4'>
              <button onClick={()=>navigate('/res')} className='font-bold transform transition-transform hover:scale-110 px-3 py-2 bg-blue-950 rounded-md text-white'>FIND FOOD</button>
            </div>

            <div className='mt-12 home-font-cust gray font-semibold'>
              <h3 className='md:text-base text-size-cust-2'>POPULAR CITIES IN INDIA</h3>
            </div>
            <div className='mb-10 flex flex-wrap gap-4 pt-1 md:text-base home-font-cust text-size-cust-2'>
              <div className='grey'>Ahmedabad</div>
              <div className='text-gray-300 font-bold'>Ahmedabad</div>
              <div className='grey'>Ahmedabad</div>
              <div className='lightgrey font-bold'>Ahmedabad</div>
              <div className='grey'>Ahmedabad</div>
              <div className='lightgrey font-bold'>Ahmedabad</div>
             
            </div>
            
          </div>

          <div className='md:w-1/2 h-custom bg-img bg-cover '></div>
        
      </div>
      <div className='bg-home-cust flex md:h-96 pb-10'> 
        <div className='flex md:flex-row flex-col ml-auto mr-auto md:gap-40 gap-10  mt-8'>
          
            <div className='flex flex-col'>
              <div className='flex justify-center'>
                <img className='h-56' src={first} alt='ig-1' />
              </div>
              <div className='text-white font-bold text-lg pt-4'>
              No Minimum Order
              </div>
            </div>

           
            <div className='flex flex-col'>
              <div className='flex justify-center'>
                <img className='h-56' src={second}  alt='ig-1' />
              </div>
              <div className='text-white pt-4 font-bold text-lg'>
                Live Order Tracking
              </div>
            </div>


          
            <div className='flex flex-col'>
              <div className='flex justify-center'>
                <img  className='h-56' src={third} alt='ig-1' />
              </div>
              <div className='text-white pt-4 font-bold text-lg'>
              Lightning-Fast Delivery
              </div>
            </div>
         
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default SignIn;
