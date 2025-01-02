import React from 'react';

const EditClubModal = ({
  isOpen,
  clubFormData,
  errorValidation,
  handleChange,
  handleActivitesChange,
  handleEditClubInfo,
  handleCancel
}) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Modifier les informations du club</h2>

        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-semibold">
            Nom du club <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nom"
            value={clubFormData.nom}
            onChange={handleChange}
            placeholder="Nom du club"
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={clubFormData.description}
            onChange={handleChange}
            placeholder="Description"
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instagramme" className="block text-sm font-semibold">
            Instagram du club
          </label>
          <input
            type="text"
            name="instagramme"
            value={clubFormData.instagramme}
            onChange={handleChange}
            placeholder="Instagram du club"
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="activites" className="block text-sm font-semibold">
            Activités <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="activites"
            value={Array.isArray(clubFormData.activites) ? clubFormData.activites.join(",") : ""}
            onChange={handleActivitesChange}
            placeholder="Activités (séparées par des virgules)"
            className="block w-full p-2 border rounded"
          />
        </div>

        {Array.isArray(errorValidation) && errorValidation.length > 0 && (
          <div className="mb-4 text-red-500 text-sm">
            {errorValidation.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleEditClubInfo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Enregistrer
          </button>
          <button
            onClick={handleCancel}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClubModal;
