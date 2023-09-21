import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants.js";
import { useSelector } from 'react-redux';
import { useState } from "react";
import Login from "./Login.jsx";
//create nav component
const Header = () =>{
    const countofcart=useSelector( (store) => store.cart.cartCount);
    const isLoggedin=useSelector( (store) => store.user.isLoggedin);
 
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setLogin] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = ()=>{
      setMenuOpen(false);
    }

    const handleLogin=()=>{
      setLogin(!isLogin);
    }

  return (
    <div className="flex shadow-lg h-16 pt-2 sticky top-0 z-50 bg-white items-center justify-between">
      <div className={`logo-container  `}>
        <img className="h-12 w-16 ml-3" src={LOGO_URL} alt="Logo" />
      </div>

      <div className="md:hidden  ml-auto hover:text-orange-500" onClick={toggleMenu}>
          <i className={`ri-${menuOpen ? 'close-line mr-4 md:block' : 'menu-line md:block'}`}></i>
      </div>

      <div style={{ borderColor: menuOpen ? '#4f46e5' : 'transparent' }} className={` ${menuOpen ? 'border-t-4 border-purple-800' : ''} flex transition-all duration-500 ease-in md-static ${menuOpen ? 'flex-col absolute top-16 z-10 w-full h-screen bg-white md:hidden' : 'pr-[3vw] gap-[4vw]'}`}>
        <li className={`list-none ${menuOpen ? 'block pl-8 mt-8 mb-3  ' : 'md:block hidden text-lg'}  font-normal2 hover:font-bold hover:text-orange-500`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li className={`list-none ${menuOpen ? 'block pl-8 my-3  ' : 'md:block hidden text-lg'}  font-normal2 hover:font-bold hover:text-orange-500`}>
          <Link to="/cart" onClick={closeMenu}>Cart
            <span className="bg-green-500 ml-1">
              <span className="m-2 text-white font-bold">{countofcart}</span>
            </span>
          </Link>
        </li>
        <li className={`list-none ${menuOpen ? 'block pl-8 my-3  '  : 'md:block hidden text-lg'}  font-normal2 hover:font-bold hover:text-orange-500`}>
          <Link to="/res" onClick={closeMenu}>Restaurants</Link>
        </li>
        
        { 
        isLoggedin===false &&  <li onClick={()=>handleLogin()}  className={`list-none ${menuOpen ? 'block pl-8 my-3  '  : 'md:block hidden text-lg'}  font-normal2  hover:cursor-pointer hover:font-bold hover:text-orange-500`}>
          Login
        </li>
        }
        
        {
          isLoggedin && <li   className={`list-none ${menuOpen ? 'block pl-8 my-3  '  : 'md:block hidden text-lg'}  font-normal2 hover:font-bold hover:text-orange-500`}>
          <Link to="/Myorders" onClick={closeMenu}>Orders</Link>
          </li>
        }

        {
          isLoggedin && <li   className={`list-none ${menuOpen ? 'block pl-8 my-3  '  : 'md:block hidden text-lg'}  font-normal2 hover:font-bold hover:text-orange-500`}>
          <Link to="/orders" onClick={closeMenu}>Favorites</Link>
          </li>
        }

      </div>   
      {
        isLogin && <div className="absolute right-0 top-0 md:w-1/4 w-screen h-screen bg-gray-100"><Login setLogin={setLogin}/></div>
      }
    </div>
  );
}




export default Header;