import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import apiService from '../../Services/apiService';
import { Toaster, toast } from "react-hot-toast";
import 'boxicons';

const Register = () => {
    const route = useNavigate()
    const [input, setInput] = useState({
      email: '',
      password: '',
      confirmPassword: ''
    })

    const triggerField = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }

  const registerForm = async (e) => {
    e.preventDefault()
    if (input.password !== input.confirmPassword){
      toast.error("Passwords do not match!", {
        duration: 2000
      })
      return
    }
    
    try{
      const body = {
        email: input.email,
        password: input.password
      }
      const user = await apiService.post("user/register", body)
      if (user.status === 201){
        toast.success(`${user.data.message}, Please signin to continue`, {
          duration: 2000
        })
        setInput({
          email: '',
          password: '',
          confirmPassword: ''
        })
      }
    } catch(error){
      toast.error(error.response.data.message, {
        duration: 2000
      })
    }
  }

    const goLogin = () => {
      route('/login')
    }

    useEffect(() => {
      localStorage.clear()
    })

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-custom text-white w-70% rounded-r-513px">
      <div className="max-w-md w-full px-8 py-12 bg-custom">
        <h1 className="text-5xl font-bold mb-12 text-80">Register Now!</h1>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={triggerField}
            placeholder="e-mail"
            className="w-full px-4 py-2 bg-white text-custom rounded-50px focus:outline-none focus:ring-2"
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
        <div className="mb-8">
          <input
            type="password"
            onChange={triggerField}
            value={input.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className='flex flex-col'>
        <button onClick={registerForm} className="w-131px py-2 bg-custom text-white font-bold rounded-full hover:bg-teal-600 border border-white mb-12">
          Register
        </button>
        <p className="text-base">
          <a onClick={goLogin} className="underline text-base cursor-pointer">
            {'<'} Back to login
          </a>
        </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register