import React from 'react'
import { useState,useEffect } from 'react';

export default function Deals() {
    const limit= new Date('march 31,2025').getTime();

    function control(){
    const start= Date.now();
    const diff=limit-start;
    if (diff <= 0) return "Expired";

     return{
      days:Math.floor(diff/(1000*60*60*24)),
     hours:Math.floor((diff/(1000*60*60))%24),
     minutes:Math.floor((diff/(1000*60))%60),
     seconds:Math.floor((diff/(1000)%60))
     }
    }

     const [timeLeft, setTimeLeft] = useState(control());
     useEffect(() => {
      if (timeLeft === "Expired") return;
  
      const timer = setInterval(() => {
        setTimeLeft(control());
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft]);

return (
       <div> 
    <header className="fixed top-0 left-0 w-full bg-black text-white py-2 text-center text-sm z-50">
    Get 25% Off This Summer Sale. Grab It Fast!{""} { timeLeft === "Expired" ? "Expired":`${timeLeft.days}D : ${timeLeft.hours}H : ${timeLeft.minutes}M : ${timeLeft.seconds}S`}
  </header>
  
    </div>
  )
}
