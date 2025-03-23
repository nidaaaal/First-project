import React, { Fragment } from 'react'
import { useProducts } from '../components/UseProduct'
import ProductCard from '../Cart/ProductCard';
import NavBar from '../components/NavBar';

export default function Kids() {
    const{product}=useProducts()
    const category=product.filter((x)=>{
        return  x.category==="kids";
      })
  return (
    
    <div className=" bg-gray-100 ">
                  <NavBar/>
            <h1 className='text-center'>Kids' Fashion</h1>
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
