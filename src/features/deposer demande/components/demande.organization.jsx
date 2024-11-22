import { useState } from "react";
import {
  useCreateEventDemande,
  useFetchAdminClubs,
} from "../../../repositories/demande.repository";

const DemandeOrganization = () => {
  const [demande, setDemande] = useState({
    eventName: "",
    description: "",
    location: "",
    eventDate: null,
    budget: 0,
  });

  const [clubId, setClubId] = useState("");
  const { data: clubs, isLoading, isError, error } = useFetchAdminClubs();
  const { createEventDemande, isPending } = useCreateEventDemande();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !demande.eventName ||
      !demande.description ||
      !demande.location ||
      !demande.eventDate ||
      demande.budget <= 0 ||
      !clubId
    ) {
      alert("Veuillez remplir tous les champs obligatoires correctement.");
      return;
    }

    const formattedDemande = {
      ...demande,
      budget: parseFloat(demande.budget),
    };

    createEventDemande(
      { clubId,formattedDemande },
      {
        onSuccess: () => {
          alert("Votre demande a été soumise avec succès !");
          setDemande({
            eventName: "",
            description: "",
            location: "",
            eventDate: null,
            budget: 0,
          });
          setClubId("");
        },
        onError: (error) => {
          console.error("Erreur lors de la soumission :", error);
          alert("Une erreur est survenue. Veuillez réessayer.");
        },
      }
    );
  };

  if (isLoading) return <p>Chargement des clubs...</p>;
  if (isError) return <p>Erreur : {error.message}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-x-5 mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
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
          step="0.01"
          id="budget"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Entrez le budget estimé"
        />
      </div>

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

      <div className="mb-4 col-span-2">
        <label
          htmlFor="club"
          className="font-bold text-sm block text-gray-700 mb-2"
        >
          Sélectionnez un club <span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => setClubId(e.target.value)}
          value={clubId}
          id="club"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="" disabled>
            Sélectionnez un club
          </option>
          {clubs?.map((club) => (
            <option key={club.clubId} value={club.clubId}>
              {club.clubName}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-1/3 col-span-2 font-medium py-2 px-4 rounded-lg focus:ring-2 focus:ring-opacity-50 ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
        }`}
      >
        {isPending ? "Envoi en cours..." : "Soumettre"}
      </button>
    </form>
  );
};

export default DemandeOrganization;
