import React, { useEffect } from 'react'
import { regval } from './Validations'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function UserRegister() {
  const navigator=useNavigate()
  
  const formik=useFormik({
    initialValues:{username:"",email:"",password:"",confirmpassword:""},
    validationSchema:regval,
    onSubmit: async (values)=>{
    
      const res = await axios.get(`http://localhost:5000/users?email=${values.email}`)
      if(res.data.length>0){
        toast.error('Email Already Exist!')
        return;
      }

      const user={
        username:values.username,
        email:values.email,
        password:values.password,
      }

      try{
        await axios.post('http://localhost:5000/users',user)
        toast.success("Joining successfull")
        navigator('/login')
      }catch{
        console.error('Joining failed');
      }

    }
      
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
      <h2 className='text-2xl '>Become an Vogue Vault member</h2>
    <p>Become a member — don’t miss out on deals, offers, discounts and bonus vouchers.</p>

    <form onSubmit={formik.handleSubmit} className="space-y-4" >
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black"  {...formik.getFieldProps('username') }/>
      <p  className='text-red-950'>{formik.errors.username}</p>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('email')} />

      <p  className='text-red-950'>{formik.errors.email}</p>
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password"  className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('password')}/>
      <p  className='text-red-950'>{formik.errors.password}</p>
      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input type="password"  className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('confirmpassword')}/>
      <p className='text-red-950'>{formik.errors.confirmpassword}</p>
      <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Become a Vogue Vault member</button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-black underline">Sign In</a>
        </p>
    </div>
    </div>
  )
}
