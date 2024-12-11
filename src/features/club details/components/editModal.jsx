import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

const EditChoiceModal = ({
  isOpen,
  handleCancel,
  handleEditChoice
}) => {
  if (!isOpen) return null; 

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Que souhaitez-vous modifier ?
        </h2>
        
        <button
          onClick={() => handleEditChoice("image")}
          className="text-blue-600 mb-4 flex items-center hover:bg-blue-100 hover:text-blue-800 p-2 rounded"
        >
          <AiOutlineEdit className="mr-2" />
          Modifier l'image
        </button>

        <button
          onClick={() => handleEditChoice("club")}
          className="text-blue-600 flex items-center hover:bg-blue-100 hover:text-blue-800 p-2 rounded"
        >
          <AiOutlineEdit className="mr-2" />
          Modifier les infos du club
        </button>

        <button
          onClick={handleCancel}
          className="text-gray-600 mt-4 flex items-center justify-center hover:bg-gray-100 p-2 rounded"
        >
          <IoMdClose className="mr-2" />
          Annuler
        </button>
      </div>
    </div>
  );
};

export default EditChoiceModal;
