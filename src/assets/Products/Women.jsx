import React from 'react'
import { useProducts } from '../components/UseProduct';
import ProductCard from '../Products/Women';
import NavBar from '../components/NavBar';

export default function Women() {
  const{product}=useProducts()
   const category=product.filter((x)=>{
       return  x.category==="women";
    })
  return (
    <div className="min-h-screen bg-gray-100">
                <NavBar/>
                <div className="container mx-auto p-4 pt-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">      
                  {category.map((item)=>(
            <ProductCard key={item.id} product={item}/>
          ))}
        </div>
        </div>
        </div>
  )
}
