import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logval } from './Validations'
import axios from 'axios'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'

export default function UserLogin() {
  const navigator=useNavigate();
  const[login,setlogin]=useState(null)
  useEffect(()=>{
  const log=localStorage.getItem('loginfo');
    if(log){
      setlogin(JSON.parse(log))
      navigator('/')
    }
  },[navigator])



  const formik=useFormik({
    initialValues:{email:"",password:""},
    validationSchema:logval,

    onSubmit: async (values)=>{
    try{const res= await axios.get(`https://json-server-cn80.onrender.com/users?email=${values.email}`)
    if(res.data.length===0){
          toast.error("No user found!");
          return;
    }

    const user=res.data[0]
    if(user.password!==values.password){
      toast.error("Invalid Password");
      return;
    }else if(user.blocked==true){
      toast.error('you cannot access to this page')
      return;
    }else{
    localStorage.setItem("loginfo",user.id)
    setlogin(user)
    toast.success("Login successfull");
    navigator('/')
    }


  }catch(error){
    toast.error("Login failed! Please try again");
      }
    }
  })



  return (
    <div>
    <NavBar/>

    <div className="flex h-screen items-center justify-center mt-10">    
    <div className="w-1/4 flex items-center justify-center">
    <div className="w-full max-w-md p-8 rounded-lg">
  <h2 className='text-2xl text-center'onDoubleClick={()=>navigator('/adminlogin')} >SIGN IN</h2>

  <form onSubmit={formik.handleSubmit} className='space-y-4'>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" type="text"{...formik.getFieldProps('email')}/>
    <p className='text-red-950'>{formik.errors.email}</p>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" type="password" {...formik.getFieldProps('password')} />
    <p className='text-red-950'>{formik.errors.password}</p>
    <button type="submit"  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Sign in</button>
    
    <Link to='/register' className="text-sm text-center text-gray-600 mt-4 p-2">
          Already have an account? <a className="p-2 text-black underline">Sign In</a>
        </Link>    </form>
    </div>
    </div>
    <div className="w-3/4 h-full flex items-center justify-center">   
      <img src="home3.jpg" alt="Fashion Image" className="w-full h-full object-cover" />
      </div>
      </div>
    </div>
  )
}
