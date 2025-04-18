import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  },
  paymentMethod: 'credit',
  cardDetails: {
    cardNumber: '',
    expiry: '',
    cvv: ''
  },
  errors: {},
  isSubmitting: false
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    updateCardDetails: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearError: (state, action) => {
      delete state.errors[action.payload];
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    resetCheckout: () => initialState
  }
});

export const {
  updateFormData,
  setPaymentMethod,
  updateCardDetails,
  setErrors,
  clearError,
  setIsSubmitting,
  resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;