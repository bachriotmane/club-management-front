import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; 
import { IoMdClose } from 'react-icons/io';

const DeleteModal = ({ isOpen, handleCancel, handleDeleteChoice }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Que souhaitez-vous supprimer ?</h2>

        <button
          onClick={() => handleDeleteChoice("image")}
          className="text-red-600 mb-4 flex items-center hover:bg-red-100 p-2 rounded"
        >
          <AiOutlineDelete className="mr-2" />
          Supprimer l'image
        </button>

        <button
          onClick={() => handleDeleteChoice("club")}
          className="text-red-600 flex items-center hover:bg-red-100 p-2 rounded"
        >
          <AiOutlineDelete className="mr-2" />
          Supprimer le club
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

export default DeleteModal;
