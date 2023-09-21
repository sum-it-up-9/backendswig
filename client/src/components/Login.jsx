import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { SetLoggedIn } from "../utils/UserSlice";


const Login= ({setLogin}) =>{
  const URL='';
 
  const dispatch=useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          if (signup) {  
            const response = await axios.post(`${URL}/signup`, formData);
            console.log('SignUp Response:', response.data);
            if (response.status === 201) {
              // Reset the form
              setFormData({
                name: "",
                email: "",
                password: "",
              });
              // Display a success alert
              alert("Sign-up successful!");

            } else if (response.status === 400) {
              // Display the backend response message for user already existing
              alert(response.data.message);
            }
          } else {
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('Login Response:', response.data);
            if (response.status === 200) {
              // Reset the form
              setFormData({
                email: "",
                password: "",
              });
              // Display a success alert
              alert("Login successful!");
              dispatch(SetLoggedIn(response.data.user));
            } else if (response.status === 400) {
              // Display the backend response message for login failure
              alert(response.data.message);
            }
          }
        } catch (error) {
          console.error('Error:', error);
          // Display a generic error alert
          alert("An error occurred. Please try again later.");
        }
    };
      
    const guestEmail = "sumit9@Gmail.com";
    const guestPassword = "abc@9681";
  
    const setGuestCredentials =  () => {
      setFormData({
        email: guestEmail,
        password: guestPassword,
      });
       loginGuest();
    };  
    
    
  const loginGuest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: guestEmail,
        password: guestPassword,
      });
      console.log('Login Response:', response.data);
      if (response.status === 200) {
        // Reset the form
        setFormData({
          email: "",
          password: "",
        });
        // Display a success alert
        alert("Login successful!");
        dispatch(SetLoggedIn(response.data.user));
      } else if (response.status === 400) {
        // Display the backend response message for login failure
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      // Display a generic error alert
      alert("An error occurred. Please try again later.");
    }
  };

    const [signup,setSignup]=useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    

    return(
        <>
        {
            signup ? (
            <>
                    <div className="pt-5" onClick={()=>setLogin(false)}><i className="ri-close-line pl-10  text-3xl"></i></div>
                    <h1 className="pl-10 pt-5"><Link  className="font-bold " onClick={()=>setSignup(false)}>Login</Link> Or <Link onClick={()=>setSignup(true)} className="font-bold">SignUp</Link> </h1>
                    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
                        <div className="flex flex-col pl-10 pt-10 h-52">
                            <input type="text"  name="name"
                value={formData.name} onChange={handleChange}  className="pl-2 border-custom h-1/2 w-2/3 " placeholder="Name" required/>
                            <input type="email"   name="email"
                value={formData.email} onChange={handleChange} className="pl-2 border-custom h-1/2  w-2/3" placeholder="Email" required/>
                            <input type="text"   name="password"
                value={formData.password} onChange={handleChange} className="pl-2 border-custom h-1/2 w-2/3 " placeholder="Password" required/>
                        
                        </div>
                        <div className="pt-10 pl-10"> <button className="bg-custom2 w-2/3 h-11 font-bold text-white rounded" type="submit">SignUp</button></div>
                    
                    </form>
            
            </>) : (
            
            <>
                <div className="pt-5" onClick={()=>setLogin(false)}><i className="ri-close-line pl-10  text-3xl"></i></div>
                <h1 className="pl-10 pt-5"><Link  className="font-bold " onClick={()=>setSignup(false)}>Login</Link> Or <Link onClick={()=>setSignup(true)} className="font-bold" >SignUp</Link> </h1>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
                    <div className="flex flex-col pl-10 pt-10 h-36">
        
                        <input type="email"   name="email"
                value={formData.email} onChange={handleChange} className="pl-2 border-custom h-1/2  w-2/3" placeholder="Email" required/>
                        <input type="text"   name="password"
                value={formData.password} onChange={handleChange} className="pl-2 border-custom h-1/2 w-2/3 " placeholder="Password" required/>
                    
                    </div>
                    <div className="pt-10 pl-10">
                      <button
                        className="bg-custom2 w-2/3 h-11 font-bold text-white rounded"
                        type="button" 
                        onClick={setGuestCredentials} 
                      >
                      LOGIN AS GUEST
                      </button>
                    </div>
                    <div className="pt-10 pl-10"> <button className="bg-custom2 w-2/3 h-11 font-bold text-white rounded" type="submit">LOGIN</button></div>
                
                </form>
            </>)
        }
           
        </>
    )
}

export default Login;