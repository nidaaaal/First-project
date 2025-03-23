
import React, { useState,useEffect, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Products/Search'
import { CartContext } from './CartProvider';
import { toast } from 'react-toastify'
import Deals from './Deals';
export default function NavBar() {
    const navigator=useNavigate()

      const[login,setlogin]=useState(null)
      const { cart,setCart } = useContext(CartContext);
    
      const logout = () => {
        setCart([])
        localStorage.removeItem("loginfo");
        localStorage.removeItem('cart');
        setlogin(null);
        navigator('/login');
      };
          useEffect(()=>{
            const log=localStorage.getItem('loginfo')
          setlogin(JSON.parse(log))
          console.log(log)
        },[])

        const handleCartClick = () => {
          const log=localStorage.getItem('loginfo')

          if (!log) {
            toast.error("please login!")
          } else {
            navigator('/cart');
          }
        };

        
      
          

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


    
  return (
  <div>
    <Deals/>
  <div className="fixed top-10 left-0 w-full flex justify-between items-center text-xs font-bold  px-5 z-40 ">
    <div className="flex space-x-12 p-3">
      <Link to="/" className="text-black">HOME</Link>
       <Link to="/men" className="text-black">MEN</Link>
       <Link to="/women" className="text-black">WOMAN</Link>
       <Link to="/kids" className="text-black">KIDS</Link>
          </div>

        <div className="flex justify-center items-center">
        <img src="/public/VogueVault.png" className="w-[90px]" />
        </div>
        
        <div className="flex items-center space-x-4">
        <Search/>

        <button className="relative p-3" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faCartShopping} size="xl" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex justify-center items-center">
              {totalItems}
            </span>
          )}
        </button>
                 {login===null?
      <Link to='/login' className='p-3 w-2'> <FontAwesomeIcon icon ={faUser} size="xl" style={{color: "#000000",}} /></Link>:
        <button onClick={logout} className='p-3'>LOGOUT</button>}
        
       </div>
    </div>
    </div>
  )
}
