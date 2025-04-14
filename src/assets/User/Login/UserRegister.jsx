import React, { useEffect } from 'react'
import { regval } from './Validations'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'
export default function UserRegister() {
 
  const navigator=useNavigate()
 
  
  const formik=useFormik({
    initialValues:{username:"",email:"",password:"",confirmpassword:""},
    validationSchema:regval,
    onSubmit: async (values)=>{
    
      const res = await axios.get(`https://json-server-izra.onrender.com/users?email=${values.email}`)
      if(res.data.length>0){
        toast.error('Email Already Exist!')
        return;
      }

      const user={
        username:values.username,
        email:values.email,
        password:values.password,
        cart:[{}],
        whishlist:[{}],
      }

      try{
        await axios.post('https://json-server-izra.onrender.com/users',user)
        toast.success("Joining successfull")
        navigator('/login')
      }catch{
        console.error('Joining failed');
      }

    }
      
  })

  return (
    <div>
      <NavBar/>
      <div className="flex h-screen items-center justify-center mt-10"> 
      <div className="w-3/4 h-full flex items-center justify-center">   
      <img src="home3.jpg" alt="Fashion Image" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/4 flex items-center justify-center ">
      <div className="w-full max-w-md p-8 rounded-lg">
            <h2 className='text-2xl text-center'>SIGN UP</h2>

    <form onSubmit={formik.handleSubmit} >
      <label className=" p-2 block text-sm font-medium text-gray-700">Name</label>
      <input type="text" className="p-2 mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black"  {...formik.getFieldProps('username') }/>
      <p  className='p-2 text-red-950'>{formik.errors.username}</p>
      <label className="p-2 block text-sm font-medium text-gray-700">Email</label>
      <input type="email" className="p-2 mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('email')} />

      <p  className='text-red-950 p-2'>{formik.errors.email}</p>
      <label className="block text-sm p-2 font-medium text-gray-700">Password</label>
      <input type="password"  className="p-2 mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('password')}/>
      <p  className='text-red-950 p-2'>{formik.errors.password}</p>
      <label className="block text-sm p-2 font-medium text-gray-700">Confirm Password</label>
      <input type="password"  className="p-2 mt-1 w-full border px-3 py-2 rounded-md focus:ring-black focus:border-black" {...formik.getFieldProps('confirmpassword')}/>
      <p className='text-red-950 p-2'>{formik.errors.confirmpassword}</p>
      <button type="submit" className="w-full bg-black p-2 text-white py-2 rounded-md hover:bg-gray-800 transition">Become a member</button>
      </form>
      <Link to='/login' className="text-sm text-center text-gray-600 mt-4 p-2">
          Already have an account? <a className="p-2 text-black underline">Sign In</a>
        </Link>
    </div>
    </div>
    </div>
    </div>
  )
}
