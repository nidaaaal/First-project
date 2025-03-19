import React, { useState } from 'react'
import { regval } from './Validations'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function UserRegister() {
  const navigator=useNavigate()
  const formik=useFormik({
    initialValues:{username:"",email:"",password:"",confirmpassword:""},
    validationSchema:regval,
    onSubmit: async (values)=>{
    
      const res = await axios.get(`http://localhost:5000/users?email=${values.email}`)
      if(res.data.length>0){
        alert('Email already exist')
        return;
      }

      const user={
        username:values.username,
        email:values.email,
        password:values.password,
      }

      try{
        await axios.post('http://localhost:5000/users',user)
        alert("registration complited")
        navigator('/')
      }catch(error){
        console.error('Registration failed',error);
      }

    }
      
  })

  return (
    <div><h1>REGISTER</h1>
    <form onSubmit={formik.handleSubmit}>

      <input type="text" placeholder='USERNAME' {...formik.getFieldProps('username')}/>
      <p>{formik.errors.username}</p>
      <input type="email" placeholder='EMAIL' {...formik.getFieldProps('email')}/>
      <p>{formik.errors.email}</p>
      <input type="password" placeholder='PASSWORD '{...formik.getFieldProps('password')}/>
      <p>{formik.errors.password}</p>
      <input type="password" placeholder='CONFIRM PASSWORD' {...formik.getFieldProps('confirmpassword')}/>
      <p>{formik.errors.confirmpassword}</p>
      <button type="submit">REGISTER</button>
      </form>
    </div>
  )
}
