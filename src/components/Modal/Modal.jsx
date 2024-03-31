import React from 'react';

const Modal = ({ isOpen, onClose, message, primaryButtonText, secondaryButtonText, onPrimaryButtonClick }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 flex justify-center items-center flex-col rounded-30px">
            <p className="mb-4 font-normal text-3xl">{message}</p>
            <div className='flex gap-6'>
              <button
                className="py-2 px-4 w-28 bg-custom text-white font-semibold rounded-30px hover:bg-teal-600"
                onClick={onPrimaryButtonClick}
              >
                {primaryButtonText}
              </button>
              {secondaryButtonText && (
                <button
                  className="py-2 px-4 w-28 bg-white text-custom font-semibold rounded-30px border-2 border-custom"
                  onClick={onClose}
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
