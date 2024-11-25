import React from 'react';
import { IoMdClose } from 'react-icons/io';

const StatusNotification = ({ statusMessage, closeMessage, setStatusMessage }) => {
  if (!statusMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
      <span>{statusMessage}</span>
      <button className="ml-2" onClick={() => closeMessage(setStatusMessage)}>
        <IoMdClose size={20} />
      </button>
    </div>
  );
};

export default StatusNotification;
