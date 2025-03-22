import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logval } from './Validations'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function UserLogin() {
  const navigator=useNavigate();
  const[login,setlogin]=useState(null)
  useEffect(()=>{
  const log=localStorage.getItem('loginfo')
    setlogin(JSON.parse(log))
    if(log){
      navigator('/')
    }
  },[])



  const formik=useFormik({
    initialValues:{email:"",password:""},
    validationSchema:logval,

    onSubmit: async (values)=>{
    try{const res= await axios.get(`http://localhost:5000/users?email=${values.email}`)
    if(res.data.length===0){
          toast.error("No user found!");
          return;
    }

    const user=res.data[0]
    if(user.password!==values.password){
      toast.error("Invalid Password");
      return;
    }
    localStorage.setItem("loginfo",JSON.stringify(user))
    setlogin(user)
    toast.success("Login successfull");
    navigator('/')



  }catch(error){
    toast.error("Login failed!");
      }
    }
  })



  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
  <h2 className='text-2xl' >Sign in</h2>
  <p >Become a member — don’t miss out on deals, offers, discounts and bonus vouchers.</p>

  <form onSubmit={formik.handleSubmit} className='space-y-4'>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" type="text"{...formik.getFieldProps('email')}/>
    <p className='text-red-950'>{formik.errors.email}</p>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" type="password" {...formik.getFieldProps('password')} />
    <p className='text-red-950'>{formik.errors.password}</p>
    <button type="submit"  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Sign in</button>
    
    <button onClick={()=>navigator('/register')}  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Become a Vogue Vault member</button>
    </form>

    </div>
    </div>
  )
}
