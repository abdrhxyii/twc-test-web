import React, { useEffect, useState } from 'react';
import Twc from '../../assets/twc.png';
import userImg from '../../assets/userimg.png';
import apiService from '../../Services/apiService';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Modal from '../Modal/Modal';

const Contacts = () => {
  const route = useNavigate();
  const title = 'Contacts Portal';
  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedContact, setEditedContact] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [primaryButton, setPrimaryButton] = useState('');
  const [secondaryButton, setSecondaryButton] = useState('');

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const contacts = await apiService.get('contact/contacts');
      if (contacts) {
        setContacts(contacts.data.contact);
      }
    } catch (error) {
      toast.error('Error occurred while retrieving the contact information', {
        duration: 2000,
      });
    }
  };

  const handleNavigate = () => {
    route('/contacts/new');
  };

  const handleEdit = (contact) => {
    setIsEdit(true);
    setEditedContact(contact);
  };

  const modelDeleteSuccess = () => {
    setModalMessage('Your contact has been deleted successfully!');
    setShowModal(true);
    setPrimaryButton('Okay');
  }

  const handleSave = async () => {
    try {
      setModalMessage('Your contact has been saved successfully!');
      setShowModal(true);
      setPrimaryButton('Okay');
      const response = await apiService.put(`contact/contacts/${editedContact._id}`, editedContact);
      if (response && response.status === 200) {
        if (response.data && response.data.message === "Contact updated successfully") {
          getContact();
          setIsEdit(false);
        } else {
          toast.error(response.data.message, {
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        duration: 2000,
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleDelete = (id, fullName) => {
    setModalMessage(`Do you want to delete the contact ${fullName}?`);
    setShowModal(true);
    setPrimaryButton('Yes');
    setSecondaryButton('Cancel');
    setEditedContact({ _id: id, full_name: fullName });
  };

  const handleDeleteConfirmation = async () => {
    setShowModal(false);
    try {
      const contact = await apiService.delete(`contact/contacts/${editedContact._id}`);
      if (contact.status === 204) {
        modelDeleteSuccess()
        getContact();
      }
    } catch (error) {
      toast.error('Error occurred while deleting the contact information', {
        duration: 2000,
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    route('/login');
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center bg-custom min-h-screen text-white">
        <div className="w-977px">
          <div style={{ paddingBottom: '3.5rem' }}>
            <img src={Twc} alt={title} className="w-72.94 h-24.03" />
            <h1 className="text-3xl w-136.76px h-60.77px font-bold">{title}</h1>
          </div>
          <div className="flex flex-row justify-between">
            <h1 className="text-4xl font-bold mb-8">Contacts</h1>
            <button
              onClick={handleNavigate}
              className="w-255px py-3 px-6 bg-custom text-white font-bold rounded-full hover:bg-teal-600 mb-8 border border-white"
            >
              add new contact
            </button>
          </div>
          <div className="bg-white text-gray-800 rounded-30px overflow-hidden">
            <div className="grid grid-cols-4 font-bold bg-white px-4 py-2 gap-x-25">
              <div style={{ marginLeft: '105px' }}>full name</div>
              <div style={{ marginLeft: '55px' }}>gender</div>
              <div className="ml-[-30px]">e-mail</div>
              <div>phone number</div>
            </div>

            {contacts.map((contact, index) => (
              <div key={index} className="grid grid-cols-4 items-center px-4 py-2 hover:bg-gray-100 gap-x-25">
                <div className="flex items-center">
                  <div className="rounded-full p-2 mr-2">
                    <img src={userImg} className="w-8 h-8 rounded-full" />
                  </div>
                  {!isEdit || editedContact._id !== contact._id ? (
                    <div style={{ marginLeft: '50px' }} className="font-semibold">
                      {contact.full_name}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="full_name"
                      value={editedContact.full_name}
                      onChange={handleInputChange}
                      className="font-semibold w-32 ml-16"
                    />
                  )}
                </div>

                {!isEdit || editedContact._id !== contact._id ? (
                  <div style={{ marginLeft: '55px' }} className="font-semibold">
                    {contact.gender}
                  </div>
                ) : (
                  <select name="gender" value={editedContact.gender} onChange={handleInputChange} className="font-semibold w-24 ml-14">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                )}

                {!isEdit || editedContact._id !== contact._id ? (
                  <div className="font-semibold ml-[-30px]">{contact.email}</div>
                ) : (
                  <input
                    type="text"
                    name="email"
                    value={editedContact.email}
                    onChange={handleInputChange}
                    className="font-semibold ml-[-30px] w-60"
                  />
                )}

                {!isEdit || editedContact._id !== contact._id ? (
                  <div className="flex items-center font-semibold">{contact.contact_num}</div>
                ) : (
                  <input
                    type="text"
                    name="contact_num"
                    value={editedContact.contact_num}
                    onChange={handleInputChange}
                    className="font-semibold w-110px"
                  />
                )}

                <div className="relative top-[-35px] left-[363%] flex gap-8">
                  {!isEdit && (
                    <>
                      <box-icon onClick={() => handleEdit(contact)} type="solid" name="pencil"></box-icon>
                      <box-icon onClick={() => handleDelete(contact._id, contact.full_name)} type="solid" name="trash"></box-icon>
                    </>
                  )}
                  {isEdit && editedContact._id === contact._id && (
                    <button
                      onClick={handleSave}
                      className="relative top-[-2px] px-5 bg-custom text-white font-bold rounded-full hover:bg-teal-600 mb-8 border border-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm flex items-center justify-end">
            <box-icon color="white" size="30px" name="log-out-circle" className="h-43px w-43px"></box-icon>
            <a onClick={logout} className="text-white hover:text-teal-200 hover:border-teal-200 border-b hover:border-b-2 font text-3xl font-normal cursor-pointer">
              logout
            </a>
          </p>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        message={modalMessage}
        primaryButtonText={primaryButton}
        secondaryButtonText={secondaryButton}
        onPrimaryButtonClick={primaryButton === 'Yes' ? handleDeleteConfirmation : () => setShowModal(false)}
      />
    </>
  );
};

export default Contacts;
