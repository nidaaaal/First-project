import { useContext, useState } from 'react';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaPaypal, 
  FaMoneyBillWave,
  FaLock,
  FaUser,
  FaEnvelope,
  FaHome,
  FaCity,
  FaMailBulk
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  updateFormData, 
  setPaymentMethod, 
  updateCardDetails, 
  setErrors, 
  clearError,
  setIsSubmitting
} from './checkoutSlice';
import { CartContext } from '../components/CartProvider';
import NavBar from '../components/NavBar';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const {
    formData,
    paymentMethod,
    cardDetails,
    errors,
    isSubmitting
  } = useSelector((state) => state.checkout);
  
  const { cart,setCart,clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      dispatch(clearError(name));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCardDetails({ [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-()+]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    dispatch(setErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  if (cart.length === 0) return;

  dispatch(setIsSubmitting(true));
  try {
    // Get user ID from localStorage
    const userId = localStorage.getItem("loginfo");

    // Prepare complete order data
    const orderData = {
      userId: userId,
      userDetails: {
        ...formData,
        email: formData.email || localStorage.getItem("userEmail") || ''
      },
      paymentMethod,
      paymentDetails: paymentMethod === 'credit' ? cardDetails : {},
      products: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      orderDate: new Date().toISOString(),
      status: 'pending',
      totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      shippingCost: 0,
      taxAmount: 0
    };

    // Submit order to backend
    const response = await axios.post(
      "https://json-server-cn80.onrender.com/orders",
      orderData
    );

    // Clear cart using context API (since you're using CartContext)

    // Navigate to confirmation
    navigate('/confirmation', { 
      state: { 
        formData,
        paymentMethod,
        cardDetails,
        cart // Pass cart data too if needed
      } 
    });

    clearCart(); // Changed from dispatch(clearCart())

    
  } catch (error) {
    console.error('Order submission failed:', error);
    // Optionally dispatch an error action if you have error handling in Redux
    // dispatch(setError('Order submission failed. Please try again.'));
  } finally {
    dispatch(setIsSubmitting(false));
  }
};
  return (
     <div>
        <NavBar/>
    
    <div className="bg-[#f1f0ee] p-6 rounded-xl shadow-md border border-gray-100 mt-30">
      <form onSubmit={handleSubmit} id="checkout-form">
        {/* Shipping Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 flex items-center">
            <FaMapMarkerAlt className="text-blue-500 mr-3" />
            Shipping Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUser className="text-gray-400 mr-2 text-sm" />
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2 text-sm" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaHome className="text-gray-400 mr-2 text-sm" />
                Street Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main St"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* City */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaCity className="text-gray-400 mr-2 text-sm" />
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="New York"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            {/* ZIP Code */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaMailBulk className="text-gray-400 mr-2 text-sm" />
                ZIP/Postal Code
              </label>
              <input
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.zip ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10001"
              />
              {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
  <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 flex items-center">
    <FaCreditCard className="text-blue-500 mr-3" />
    Payment Method
  </h2>

  <div className="space-y-4 mb-6">
    {/* Credit Card */}
    <div className="flex items-start">
      <input
        id="credit"
        name="payment"
        type="radio"
        checked={paymentMethod === 'credit'}
        onChange={() => dispatch(setPaymentMethod('credit'))} // Changed to use Redux action
        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor="credit" className="ml-3 block text-sm font-medium text-gray-700">
        <div className="flex items-center">
          <FaCreditCard className="mr-2 text-gray-600" />
          <span>Credit Card</span>
        </div>
      </label>
    </div>

    {paymentMethod === 'credit' && (
      <div className="ml-7 pl-1 space-y-4 animate-fadeIn">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            name="cardNumber"
            value={cardDetails.cardNumber} // Added value binding
            onChange={(e) => dispatch(updateCardDetails({ cardNumber: e.target.value }))} // Added Redux update
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1234 5678 9012 3456"
            pattern="[\d ]{16,19}"
            required={paymentMethod === 'credit'}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              name="expiry"
              value={cardDetails.expiry} // Added value binding
              onChange={(e) => dispatch(updateCardDetails({ expiry: e.target.value }))} // Added Redux update
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MM/YY"
              pattern="\d{2}/\d{2}"
              required={paymentMethod === 'credit'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              name="cvv"
              value={cardDetails.cvv} // Added value binding
              onChange={(e) => dispatch(updateCardDetails({ cvv: e.target.value }))} // Added Redux update
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123"
              pattern="\d{3,4}"
              required={paymentMethod === 'credit'}
            />
          </div>
        </div>
      </div>
    )}

    {/* PayPal */}
    <div className="flex items-start">
      <input
        id="paypal"
        name="payment"
        type="radio"
        checked={paymentMethod === 'paypal'}
        onChange={() => dispatch(setPaymentMethod('paypal'))} // Changed to use Redux action
        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
        <div className="flex items-center">
          <FaPaypal className="mr-2 text-blue-500" />
          <span>PayPal</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">You'll be redirected to PayPal</p>
      </label>
    </div>

    {/* Cash on Delivery */}
    <div className="flex items-start">
      <input
        id="cod"
        name="payment"
        type="radio"
        checked={paymentMethod === 'cod'}
        onChange={() => dispatch(setPaymentMethod('cod'))} // Changed to use Redux action
        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
        <div className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-green-500" />
          <span>Cash on Delivery</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
      </label>
    </div>
  </div>
</div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all flex items-center justify-center ${
            isSubmitting || cart.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-md'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FaLock className="mr-2" />
              {cart.length === 0 ? 'Your Cart is Empty' : 'Place Order'}
            </>
          )}
        </button>

        {/* Security Message */}
        <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center">
          <FaLock className="mr-1" />
          Secure checkout. Your information is protected.
        </p>
      </form>
    </div>
    </div>
  );
};

export default CheckoutForm;