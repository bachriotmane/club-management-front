import React from 'react';

const EditImageModal = ({
  isOpen,
  selectedImage,
  imageUrl,
  errorValidation,
  setSelectedImage,
  handleSubmitImageEdit,
  handleCancel
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Modifier l'image du club</h2>

        <div className="mb-4">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : (imageUrl || "/default-image.jpg")}
            alt="Aperçu de l'image"
            className="w-full h-[15rem] rounded"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          className="mb-4 border p-2 w-full rounded"
        />

        {Array.isArray(errorValidation) && errorValidation.length > 0 && (
          <div className="mb-4 text-red-500 text-sm">
            {errorValidation.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSubmitImageEdit}
            disabled={!selectedImage}
            className={`px-4 py-2 rounded-lg text-white ${selectedImage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Sauvegarder
          </button>
          <button
            onClick={handleCancel}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;
