
import { BrowserRouter, Route, RouterProvider, Routes ,useLocation} from 'react-router-dom'
import UserLogin from './assets/Login/UserLogin'
import UserRegister from './assets/Login/UserRegister'
import Home from '../src/assets/home/Home'
import Women from './assets/Products/Women';
import Men from './assets/Products/Men';
import Kids from './assets/Products/Kids';
import { CartProvider } from './assets/components/CartProvider';
import ProductDetails from './assets/Cart/ProductDetails';
import Cart from './assets/Cart/Cart';
import Payment from './assets/Cart/Payment';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import AllProduct from './assets/Products/AllProduct';
import BodyContent from './assets/components/BodyContent';


function App() {
  document.body.style.backgroundColor = "#eeeeec";

  return (
    <>
     <CartProvider>
      <BrowserRouter>
        <AnimatedRoutes />
        <ToastContainer />
      </BrowserRouter>
    </CartProvider>

  
        
    </>
  )
}
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/kids/:id" element={<ProductDetails />} />
        <Route path="/women/:id" element={<ProductDetails />} />
        <Route path="/men/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path='/all' element={<AllProduct/>}/>
        <Route path='/homebody' element={<BodyContent/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App
