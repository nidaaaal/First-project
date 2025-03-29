import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {logval} from '../../User/Login/Validations'

export default function AdminLogin() {
  const navigator = useNavigate();
  const [admin, setAdmin] = useState(null);

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
      try {
        const res = await axios.get(`http://localhost:5000/admin?email=${values.email}`);

        if(res.data.length===0){
                  toast.error("Access denied!");
                  return;
            }

            const admin=res.data[0]
                if(admin.password!==values.password){
                  toast.error("Invalid Password");
                  return;
                }
          localStorage.setItem('admininfo', JSON.stringify(admin));
          setAdmin(admin);
          console.log(admin)
          toast.success('Admin login successful!');
          navigator('/dashboard');  
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed!');
        console.error(error);
      }
    },
  });

  return (
    <div>
<div className="h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/home3.jpg')" }}>    
<div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md bg-[#eeeeec] p-8 shadow-lg rounded-lg mt-10">
          <h2 className="text-2xl text-center">ADMIN SIGN IN</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black"
                type="text"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black"
                type="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </form>
        </div>
        </div>  
      </div>
    </div>
  );
}