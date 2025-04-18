import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logval } from './Validations'
import axios from 'axios'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'

export default function UserLogin() {
  const navigator = useNavigate()
  const [login, setLogin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const log = localStorage.getItem('loginfo')
    if (log) {
      setLogin(JSON.parse(log))
      navigator('/')
    }
  }, [navigator])

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: logval,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/users?email=${values.email}`)
        
        if (res.data.length === 0) {
          toast.error("No user found!")
          return
        }

        const user = res.data[0]
        if (user.password !== values.password) {
          toast.error("Invalid Password")
          return
        } else if (user.blocked) {
          toast.error('Your account has been blocked')
          return
        } else {
          localStorage.setItem("loginfo", user.id)
          localStorage.setItem("userEmail",user.email)
          setLogin(user)
          toast.success("Login successful!")
          navigator('/')
        }
      } catch (error) {
        toast.error("Login failed! Please try again")
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <div className="min-h-screen flex flex-col md:mt-25">
      <NavBar />
      
      {/* Background image container with proper spacing */}
      <div 
        className="flex-grow bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/home3.jpg')" }}
      >
        {/* Container with gap from navbar */}
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
          {/* Form card with glass morphism effect */}
          <div className="w-full max-w-md backdrop-blur-sm bg-white/90 p-8 rounded-xl shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-black'
                  } focus:outline-none focus:ring-2`}
                  placeholder="your@email.com"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.password && formik.errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-black'
                  } focus:outline-none focus:ring-2`}
                  placeholder="••••••••"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-black hover:text-gray-700">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-black hover:text-gray-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}