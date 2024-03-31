import React, {useState} from 'react'
import Twc from '../../assets/twc.png';
import apiService from '../../Services/apiService';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import 'boxicons';

const ContactForm = () => {
    const route = useNavigate()
    const title = "Contacts Portal";
    const [input, setInput] = useState({
      fullname: '',
      email: '',
      contact_num: '',
      gender: ''
    });

    const triggerField = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }

    const createContact = async (e) => {
      e.preventDefault()
      try{
        const data = {
          fullname: input.fullname,
          email: input.email,
          contact_num: input.contact_num,
          gender: input.gender
        }
        const contact = await apiService.post("contact/contacts", data)
        if (data){
          toast.success(contact.data.message, {
            duration: 2000
          })
          setInput({
            fullname: '',
            email: '',
            contact_num: '',
            gender: null
          })
          route('/contacts')
        }
      }catch(error) {
        toast.error(error.response.data.message, {
          duration: 2000
        })
      }

    }

    const logout = () => {
      localStorage.clear()
      route("/login")
    }

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="flex flex-col items-center justify-center bg-custom min-h-screen text-white">
      <div>
        <div style={{ paddingBottom: '3.5rem'}}> 
            <img src={Twc} alt={title} className="w-72.94 h-24.03" />
            <h1 className="text-3xl w-136.76px h-60.77px font-bold">{title}</h1>
        </div>
        <h1 className="text-4xl font-bold mb-12">New Contact</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <input
            type="text"
            name='fullname'
            onChange={triggerField}
            value={input.fullname}
            placeholder="full name"
            className="w-477px px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            name='email'
            value={input.email}
            onChange={triggerField}
            placeholder="e-mail"
            className="w-477px px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <input
            type="tel"
            name='contact_num'
            value={input.contact_num}
            onChange={triggerField}
            placeholder="phone number"
            className="w-477px px-4 py-2 bg-white text-gray-800 rounded-50px focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex items-center justify-between">
            <div>Gender</div>
            <label className="mr-4">
              <input type="radio" name="gender" onChange={triggerField} value="male" className="mr-2" />
              male
            </label>
            <label>
              <input type="radio" name="gender" onChange={triggerField} value="female" className="mr-2" />
              female
            </label>
          </div>
          <button onClick={createContact} className="w-323px py-3 px-6 bg-custom text-white font-bold rounded-full hover:bg-teal-600 mb-8 border border-white">
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
    </div>
    </>
  )
}

export default ContactForm