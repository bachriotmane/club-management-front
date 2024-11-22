import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateClubDemande } from "../../../repositories/demande.repository";

const DemandeCreation = () => {
  const [demandeCreation, setDemandeCreation] = useState({
    nomClub: "",
    description: "",
    instagram: "",
    activities: [],
  });
  const { createClubDemande, isPending } = useCreateClubDemande();
  const [newActivity, setNewActivity] = useState("");

  const addActivity = () => {
    if (newActivity.trim() === "") {
      alert("L'activité ne peut pas être vide.");
      return;
    }
    setDemandeCreation((prevState) => ({
      ...prevState,
      activities: [...prevState.activities, newActivity.trim()],
    }));
    setNewActivity("");
  };

  const removeActivity = (index) => {
    setDemandeCreation((prevState) => ({
      ...prevState,
      activities: prevState.activities.filter((_, i) => i !== index),
    }));
  };

  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/;
    return regex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!demandeCreation.nomClub || !demandeCreation.description || demandeCreation.activities.length === 0) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (demandeCreation.instagram && !isValidUrl(demandeCreation.instagram)) {
      alert("Veuillez entrer un lien Instagram valide.");
      return;
    }

    createClubDemande(demandeCreation, {
      onSuccess: () => {
        alert("Votre demande a été soumise avec succès !");
        setDemandeCreation({
          nomClub: "",
          description: "",
          instagram: "",
          activities: [],
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-x-5 mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      {/* Nom du club */}
      <div className="mb-4">
        <label htmlFor="nomClub" className="font-bold text-sm text-gray-700 mb-2">
          Nom du club <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setDemandeCreation({ ...demandeCreation, nomClub: e.target.value })}
          value={demandeCreation.nomClub}
          type="text"
          id="nomClub"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Entrez le nom du club"
        />
      </div>

      {/* Lien Instagram */}
      <div className="mb-4">
        <label htmlFor="instagramLink" className="font-bold text-sm text-gray-700 mb-2">
          Lien Instagram
        </label>
        <input
          onChange={(e) => setDemandeCreation({ ...demandeCreation, instagram: e.target.value })}
          value={demandeCreation.instagram}
          type="text"
          id="instagramLink"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Ajoutez le lien Instagram"
        />
      </div>

      {/* Description */}
      <div className="mb-4 col-span-2">
        <label htmlFor="description" className="font-bold text-sm block text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          onChange={(e) => setDemandeCreation({ ...demandeCreation, description: e.target.value })}
          value={demandeCreation.description}
          id="description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          placeholder="Décrivez votre club..."
        ></textarea>
      </div>

      {/* Activités */}
      <div className="mb-4 col-span-2">
        <label htmlFor="activities" className="font-bold text-sm block text-gray-700 mb-2">
          Activités <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            type="text"
            id="activities"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ajoutez une activité"
          />
          <button
            type="button"
            onClick={addActivity}
            aria-label="Ajouter une activité"
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Ajouter
          </button>
        </div>
        <ul className="mt-4 gap-2 flex flex-wrap">
          {demandeCreation.activities.map((activity, index) => (
            <li
              key={index}
              className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-300 mb-2"
            >
              <span className="font-bold text-gray-600">{index + 1}. </span>
              <span>{activity}</span>
              <button
                type="button"
                onClick={() => removeActivity(index)}
                aria-label={`Supprimer l'activité ${activity}`}
                className="text-red-500 font-bold hover:text-red-700"
              >
                <AiOutlineClose />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton Soumettre */}
      <button
        type="submit"
        disabled={isPending}
        className={`w-1/2 font-medium py-2 px-4 rounded-lg focus:ring-2 focus:ring-opacity-50 ${
          isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
        }`}
      >
        Soumettre
      </button>
    </form>
  );
};

export default DemandeCreation;
