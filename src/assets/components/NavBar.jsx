
import React, { useState,useEffect, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Products/Search'
import { CartContext } from './CartProvider';
import { toast } from 'react-toastify'
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
    <div className="h-15 w-full flex justify-between items-center text-xs font-bold fixed top-0 left-0 bg-white shadow-md px-5 z-10">
      <div className="flex space-x-4">
        <Link to="/"  className='p-3 text-black '>Home</Link>
        <a href="nodatanow"  className='p-3 text-black '>Customer Service</a>
        <a href="nodatanow" className="text-black p-3 ">Newsletter</a>
        </div>

        <div className="flex justify-center items-center">
        <img src="VogueVault.png" alt="H&M Logo" className="w-[90px]" />
        </div>
        
        <div className="flex items-center space-x-4">
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
        <Search/>

       </div>
    </div>
  )
}
