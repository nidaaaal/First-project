import { useContext } from 'react';
import { FaCheckCircle, FaBox, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartProvider';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/NavBar"

const OrderConfirmation = () => {
  // Get data from Redux store
  const location = useLocation();
  const { formData, paymentMethod, cardDetails, cart } = location.state || {};
  const reduxData = useSelector((state) => state.checkout);
  const actualFormData = formData || reduxData.formData;
  const actualPaymentMethod = paymentMethod || reduxData.paymentMethod;
  const actualCardDetails = cardDetails || reduxData.cardDetails;
  const orderNumber = `#${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  // Calculate total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99; // Example shipping cost
  const tax = subtotal * 0.08; // Example tax (8%)
  const total = subtotal + shipping + tax;

  // Format payment method display
  const getPaymentMethodDisplay = () => {
    switch (paymentMethod) {
      case 'credit':
        return (
          <div className="flex items-center">
            <FaCreditCard className="mr-2 text-gray-600" />
            <span>Credit Card ending in {cardDetails.cardNumber.slice(-4)}</span>
          </div>
        );
      case 'paypal':
        return (
          <div className="flex items-center">
            <FaPaypal className="mr-2 text-blue-500" />
            <span>PayPal</span>
          </div>
        );
      case 'cod':
        return (
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            <span>Cash on Delivery</span>
          </div>
        );
      default:
        return paymentMethod;
    }
  };

  return (
    <div><NavBar/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Order Confirmation Header */}
      <div className="text-center mb-8">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Your order {orderNumber} has been placed successfully.</p>
        <p className="text-gray-600">A confirmation email has been sent to {formData.email}.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaBox className="text-blue-500 mr-3" />
            Order Summary
          </h2>
          
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-3" />
              Shipping Information
            </h2>
            <div className="space-y-2">
              <p className="font-medium">{formData.name}</p>
              <p>{formData.address}</p>
              <p>{formData.city}, {formData.zip}</p>
              <p>{formData.phone}</p>
              <p className="text-blue-500">{formData.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCreditCard className="text-blue-500 mr-3" />
              Payment Method
            </h2>
            <div className="space-y-2">
              {getPaymentMethodDisplay()}
              {paymentMethod === 'credit' && (
                <div className="ml-7 mt-2 text-sm text-gray-600">
                  <p>Expires: {cardDetails.expiry}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link 
          to="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact us</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default OrderConfirmation;