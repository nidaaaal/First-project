import React, { useContext } from 'react'
import NavBar from '../components/NavBar';
import { useProducts } from '../components/UseProduct';
import { CartContext } from '../components/CartProvider';
import Scrollx from '../animations/Scrollx';
import { useNavigate } from 'react-router-dom';
import ScrollWrapper from '../animations/ScrollWrapper';
import PageWrapper from '../animations/Pagewrapper';
import ProductCard from '../Cart/ProductCard';

export default function AllProduct() {
    const{product}=useProducts();
    const {addToCart}=useContext(CartContext);
    const{navigator}=useNavigate();
    
     
  return (
    <div>
                <NavBar />

    <PageWrapper>
        <div className="container mt-30  text-center">                
                <h1 className="text-[40px] font-serif my-[20px]">Explore Our Latest Fashion Collection</h1>
                <p className="text-[16px] text-lg max-w-2xl mx-auto mt-4">
            Discover the latest trends in fashion with our exclusive collection of stylish apparel. 
            Elevate your wardrobe with high-quality fabrics, modern designs, and affordable prices. 
            Browse through our curated selection and find the perfect look that suits your style!
          </p></div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-6">
         {product.map((item, index) => (
            <div
              key={index}

              className="scale-90 rounded-md overflow-hidden shadow-lg hover:scale-95 transition-transform duration-300"
            >                 
          

             
                          <ProductCard key={item.id} product={item}/>

                </div>
          ))}
        </div>
</PageWrapper>
</div>


)
}
