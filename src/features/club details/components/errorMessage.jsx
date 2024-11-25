import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ErrorNotification = ({ errorDelete, closeMessage, setErrorDelete }) => {
  if (!errorDelete) return null; 

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
      <span>{errorDelete}</span>
      <button className="ml-2" onClick={() => closeMessage(setErrorDelete)}>
        <IoMdClose size={20} />
      </button>
    </div>
  );
};

export default ErrorNotification;
