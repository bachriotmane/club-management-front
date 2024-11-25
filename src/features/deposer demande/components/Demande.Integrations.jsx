import { useState } from "react";
import { useCreateIntegrationDemande, useFetchNotJoinedClubs } from "../../../repositories/demande.repository";
import { useLocation, useNavigate } from "react-router-dom";

const DemandeIntegration = () => {
  const location = useLocation();
  const { clubId: passedClubId, clubName: passedClubName } = location.state || {};
  const [clubId, setClubId] = useState(passedClubId || ""); 
  const [motivation, setMotivation] = useState(
  passedClubName ? `Je souhaite rejoindre le club ${passedClubName}` : "" );
  const { data: availableClubs, error, isError, isLoading } = useFetchNotJoinedClubs();
  const { createIntegrationDemande , isPending } = useCreateIntegrationDemande();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    createIntegrationDemande({clubId, motivation});
    navigate(-1);
  };

  if (isLoading) {
    return <Message>Chargement des clubs disponibles...</Message>;
  }

  if (isError) {
    return <Message>Une erreur est survenue : {error?.message || "Veuillez réessayer plus tard."}</Message>;
  }

  if (!availableClubs || availableClubs.length === 0) {
    return <Message>Aucun club disponible pour le moment.</Message>;
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className=" mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <div className="mb-4 ">
        <label htmlFor="demandeType" className="font-bold block  text-gray-700 mb-2">
          Club <span className="text-red-500">*</span>
        </label>
        <select
          id="demandeType"
          value={clubId}
          required
          onChange={(e) => setClubId(e.target.value)}
          disabled={Boolean(passedClubId)}
          aria-label="Sélectionnez un club pour votre demande"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="" disabled>
            Sélectionnez un club
          </option>
          {availableClubs.map((club) => (
            <option key={club.clubId} value={club.clubId}>
              {club.clubName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 ">
        <label htmlFor="motivation" className="font-bold block text-gray-700 mb-2">
          Motivation <span className="text-red-500">*</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows="4"
          placeholder="Bonjour, je suis ..."
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          required
          disabled={isPending}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-1/4 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isPending ? "Envoi en cours..." : "Soumettre"}
      </button>
    </form>
  );
};

export default DemandeIntegration;

// eslint-disable-next-line react/prop-types
const Message = ({ children }) => (
  <div className="h-screen flex items-center justify-center">
    {children}
  </div>
);
