import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logval } from '../../User/Login/Validations';
import NavBar from '../../User/components/NavBar'; // Import your NavBar component

export default function AdminLogin() {
  const navigator = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminInfo = localStorage.getItem('admininfo');
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
      navigator('/dashboard'); 
    }
  }, [navigator]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: logval,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/admin?email=${values.email}`);

        if(res.data.length === 0){
          toast.error("Access denied!");
          return;
        }

        const admin = res.data[0];
        if(admin.password !== values.password){
          toast.error("Invalid Password");
          return;
        }
        
        localStorage.setItem('admininfo', JSON.stringify(admin));
        setAdmin(admin);
        toast.success('Admin login successful!');
        navigator('/dashboard');  
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed!');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />
      
      {/* Main Content */}
      <div 
        className="flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/home3.jpg')" }}
      >
<div className="w-full max-w-md bg-[#eeeeec] p-6 sm:p-8 shadow-lg rounded-lg mx-4 pt-24 pb-12 md:mt-25">
<div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">ADMIN SIGN IN</h2>
            <p className="text-gray-600 mt-2">Access your admin dashboard</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                type="email"
                placeholder="Enter admin email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : 'Sign In'}
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              <Link to="/forgot-password" className="text-black hover:underline">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Footer (optional) */}
      <footer className="bg-black text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}