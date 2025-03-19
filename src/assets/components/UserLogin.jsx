import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logval } from './Validations'
import axios from 'axios'

export default function UserLogin() {
  const navigator=useNavigate()
  const formik=useFormik({
    initialValues:{email:"",password:""},
    validationSchema:logval,

    onSubmit: async (values)=>{
    try{const res= await axios.get(`http://localhost:5000/users?email=${values.email}`)
    if(res.data.length===0){
      alert('no user found')
      return;
    }

    const user=res.data[0]
    if(user.password!==values.password){
      alert('entered a wrong password!')
      return;
    }
    alert('login successfull')
    navigator('/dashboard')
  }catch(error){
    console.error('Login failed!');    
  }


    }
  })

  return (
    <div>
    <h1>LOGIN</h1>
    <form onSubmit={formik.handleSubmit}>

    <input type="text" placeholder='EMAIL' {...formik.getFieldProps('email')}/>
    <p>{formik.errors.email}</p>
    <input type="password" placeholder='PASSWORD' {...formik.getFieldProps('password')}/>
    <p>{formik.errors.password}</p>
    <button type="submit">LOGIN</button>
    <button onClick={()=>navigator('/register')}>SIGN-UP</button>
    
    </form>
    </div>
  )
}
