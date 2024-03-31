import {Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import './App.css'
import ContactForm from './components/ContactForm/ContactForm';
import Modal from './components/Modal/Modal';
import Contacts from './components/Contacts/Contacts';
import Register from './components/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProtectedRoute element={<Welcome/>}/>}/>
        <Route path='/contacts/new' element={<ProtectedRoute element={<ContactForm/>}/>}/>
        <Route path='/contacts' element={<ProtectedRoute element={<Contacts/>}/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
