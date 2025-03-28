
import { BrowserRouter, Route, RouterProvider, Routes ,useLocation} from 'react-router-dom'
import UserLogin from './assets/User/Login/UserLogin'
import UserRegister from './assets/User/Login/UserRegister'
import Home from '../src/assets/User/home/Home'
import Women from './assets/User/Products/Women';
import Men from './assets/User/Products/Men';
import Kids from './assets/User/Products/Kids';
import { CartProvider } from './assets/User/components/CartProvider';
import ProductDetails from './assets/User/Cart/ProductDetails';
import Cart from './assets/User/Cart/Cart';
import Payment from './assets/User/Cart/Payment';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import AllProduct from './assets/User/Products/AllProduct';
import BodyContent from './assets/User/components/BodyContent';
import Dashboard from './assets/Admin/Home/Dashboard';
import AdminLogin from './assets/Admin/Login/Adminlogin';
import ProtectedRoute from './assets/Admin/Login/ProtuctRoute';
import OrdersPage from './assets/Admin/Orders/OrderPage';
import ProductManagement from './assets/Admin/Product/ProductManagment';
import UsersList from './assets/Admin/Costomers/UsersList';
import SalesDetails from './assets/Admin/Sales/SalesDetails';


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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}/>
        <Route path="/admin/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>}/>
        <Route path="/admin/customers" element={<UsersList />}/>
        <Route path="/admin/sales" element={<SalesDetails />}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App
