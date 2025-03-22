
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import UserLogin from './assets/Login/UserLogin'
import UserRegister from './assets/Login/UserRegister'
import Home from './assets/Login/Home'
import Women from './assets/Products/Women';
import Men from './assets/Products/Men';
import Kids from './assets/Products/Kids';
import ProductDetails from './assets/components/ProductDetails';
import Cart from './assets/Cart/Cart';
import { CartProvider } from './assets/components/CartProvider';
import Checkout from './assets/Cart/Payment';
import Payment from './assets/Cart/Payment';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  document.body.style.backgroundColor = "white";

  return (
    <>
    <CartProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<UserLogin/>}></Route>
    <Route path='/register' element={<UserRegister/>}></Route>
    <Route path='/men' element={<Men/>}></Route>
    <Route path='/women' element={<Women/>}></Route>
    <Route path='/kids' element={<Kids/>}></Route>
    <Route path="/kids/:id" element={<ProductDetails />} />
    <Route path="/women/:id" element={<ProductDetails />} />
    <Route path="/men/:id" element={<ProductDetails />} />
    <Route path='/cart' element={<Cart/>}> </Route>
    <Route path="/payment" element={<Payment />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>
    </CartProvider>

  
        
    </>
  )
}

export default App
