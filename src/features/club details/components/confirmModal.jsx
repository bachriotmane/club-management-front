import React from 'react';

const ConfirmModal = ({
  isOpen,
  handleCancel,
  handleConfirmDelete,
  deleteChoice
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-lg font-bold mb-4">Êtes-vous sûr ?</h2>
        <p>
          {deleteChoice === "image" 
            ? "Confirmer la suppression de l'image ?" 
            : "Confirmer la suppression du club ?"}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleConfirmDelete}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Confirmer
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
