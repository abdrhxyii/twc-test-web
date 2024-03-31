import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../Services/apiService';
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const route = useNavigate()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const triggerField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const loginForm = async (e) => {
    e.preventDefault()
    try{
      const body = {
        email: input.email,
        password: input.password
      }
      const user = await apiService.post("user/login", body)
      if (user.status === 200){
        localStorage.setItem("authToken", user.data.token)
        route('/')
      }
    } catch(error){
      toast.error(error.response.data.message, {
        duration: 2000
      })
    }
  }

  const handleRoute = () => {
    route('/register')
  }

  useEffect(() => {
    localStorage.clear()
  })

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom text-white w-70% rounded-r-513px">
      <div className="max-w-md w-full px-8 py-12 bg-custom">
        <h1 className="text-5xl font-bold mb-6 text-80">Hi there,</h1>
        <p className="mb-8 text-3xl font-normal w-240px">Welcome to our contacts portal</p>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            onChange={triggerField}
            value={input.email}
            placeholder="e-mail"
            className="w-full px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-8">
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={triggerField}
            placeholder="password"
            className="w-full px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className='flex justify-between items-center'>
        <button onClick={loginForm} className="w-131px py-2 bg-custom text-white font-bold rounded-full hover:bg-teal-600 border border-white">
          Login
        </button>
        <p className="text-xl text-center">
          or{' '}
          <a onClick={handleRoute} className="underline text-xl ml-15px cursor-pointer">
            Click here to Register
          </a>
        </p>
        </div>
      </div>
    </div>
    </>
    )
}

export default Login