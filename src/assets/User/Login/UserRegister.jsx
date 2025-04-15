import React from 'react'
import { regval } from './Validations'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'

export default function UserRegister() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", confirmpassword: "" },
    validationSchema: regval,
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`https://json-server-cn80.onrender.com/users?email=${values.email}`)
        if (res.data.length > 0) {
          toast.error('Email Already Exists!')
          return
        }

        const user = {
          username: values.username,
          email: values.email,
          password: values.password,
          cart: [{}],
          whishlist: [{}],
        }

        await axios.post('https://json-server-cn80.onrender.com/users', user)
        toast.success("Registration successful!")
        navigate('/login')
      } catch (err) {
        console.error('Registration failed:', err)
        toast.error('Something went wrong')
      }
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Background container */}
      <div
        className="flex-grow bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/home3.jpg')" }}
      >
        {/* Centered card */}
        <div className="flex items-center justify-center min-h-screen pt-[120px] pb-8 px-4 md:pt-[140px]">
        <div className="w-full max-w-md backdrop-blur-sm bg-white/90 p-8 rounded-xl shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="mt-2 text-gray-600">Join us and start shopping</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.username && formik.errors.username
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-black'
                  } focus:outline-none focus:ring-2`}
                  placeholder="John Doe"
                  {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
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

              {/* Password */}
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.confirmpassword && formik.errors.confirmpassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-black'
                  } focus:outline-none focus:ring-2`}
                  placeholder="••••••••"
                  {...formik.getFieldProps('confirmpassword')}
                />
                {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.confirmpassword}</p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-black hover:text-gray-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
