import { useState } from "react";

const DemandeOrganization = () => {
  const [demande, setDemande] = useState({
    eventName: "",
    description: "",
    location: "",
    eventDate: null,
    budget: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (
      !demande.eventName ||
      !demande.description ||
      !demande.location ||
      !demande.eventDate ||
      demande.budget <= 0
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Conversion du budget en entier
    const formattedDemande = {
      ...demande,
      budget: parseInt(demande.budget, 10),
    };

    // Simulation de l'envoi des données (remplacez par votre fonction d'API)
    console.log("Demande soumise :", formattedDemande);

    alert("Votre demande a été soumise avec succès !");
    setDemande({
      eventName: "",
      description: "",
      location: "",
      eventDate: null,
      budget: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-x-5 mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      {/* Titre */}
      <div className="mb-4">
        <label
          htmlFor="nomEvenement"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) =>
            setDemande({ ...demande, eventName: e.target.value })
          }
          value={demande.eventName}
          type="text"
          id="nomEvenement"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Entrez le nom de l'événement"
        />
      </div>

      {/* Lieu */}
      <div className="mb-4">
        <label
          htmlFor="location"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Lieu <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) =>
            setDemande({ ...demande, location: e.target.value })
          }
          value={demande.location}
          type="text"
          id="location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Entrez le lieu de l'événement"
        />
      </div>

      {/* Budget */}
      <div className="mb-4">
        <label
          htmlFor="budget"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Budget (en DH) <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) =>
            setDemande({ ...demande, budget: e.target.value })
          }
          value={demande.budget}
          type="number"
          min="1"
          id="budget"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Entrez le budget estimé"
        />
      </div>

      {/* Date et heure */}
      <div className="mb-4">
        <label
          htmlFor="dateTime"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Date et heure <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) =>
            setDemande({ ...demande, eventDate: e.target.value })
          }
          value={demande.eventDate || ""}
          type="datetime-local"
          id="dateTime"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Description */}
      <div className="mb-4 col-span-2">
        <label
          htmlFor="description"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          onChange={(e) =>
            setDemande({ ...demande, description: e.target.value })
          }
          value={demande.description}
          id="description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          placeholder="Décrivez l'événement..."
        ></textarea>
      </div>

      {/* Sélection du club */}
      <div className="mb-4 col-span-2">
        <label
          htmlFor="club"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Sélectionnez un club <span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) =>
            setDemande({ ...demande, club: e.target.value })
          }
          id="club"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">Choisissez un club</option>
          <option value="club1">Club 1</option>
          <option value="club2">Club 2</option>
        </select>
      </div>

      {/* Bouton Soumettre */}
      <button
        type="submit"
        className="w-full col-span-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Soumettre
      </button>
    </form>
  );
};

export default DemandeOrganization;
