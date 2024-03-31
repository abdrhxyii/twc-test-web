import React from 'react';
import Twc from '../../assets/twc.png';
import { useNavigate } from 'react-router-dom';
import apiService from '../../Services/apiService';
import 'boxicons';

const Welcome = () => {
    const route = useNavigate()
    const title = "Contacts Portal";
    const handleNavigation = () => {
      route('contacts/new')
    }
    const logout = () => {
      localStorage.clear()
      route("/login")
    }

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-custom min-h-screen text-white">
      <div className="max-w-2xl px-8 py-12">
        <div style={{ paddingBottom: '5.5rem' }}> 
            <img src={Twc} alt={title} className="w-72.94 h-24.03" />
            <h1 className="text-3xl w-136.76px h-60.77px font-bold">{title}</h1>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome,</h1>
        <p className="text-25px mb-8">This is where your contacts will live. Click the button below to add a new contact.</p>
        <button onClick={handleNavigation} className="py-3 px-6 bg-custom text-white font-bold rounded-full hover:bg-teal-600 mb-8 border border-white">
          add your first contact
        </button>
        <p className="text-sm flex items-center justify-end">
          <box-icon color="white" size="30px" name='log-out-circle' className="h-43px w-43px"></box-icon>
          <a onClick={logout} className="text-white hover:text-teal-200 hover:border-teal-200 border-b hover:border-b-2 font text-3xl font-normal cursor-pointer">
            logout
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default Welcome