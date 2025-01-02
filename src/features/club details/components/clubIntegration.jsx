import { FaPlug, FaUserShield } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
const ClubIntegration = ({ club, navigate }) => {
  return (
    <div className="flex items-center space-x-4">
      {club.statutDemande === "" ? (
        <button
          onClick={() =>
            navigate("/demandes/deposer", {
              state: { clubId: club.uuid, clubName: club.nom, regenerate: true}
            })
          }
          className="flex items-center px-4 py-2 text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-700 transition-all duration-300"
        >
          <FaPlug className="mr-2" size={20} />
          Demande d'intégration
        </button>
      ) : club.statutDemande === "ACCEPTE" ? (
        <div className="flex items-center space-x-2">
          <FaUserShield className="text-green-500" size={20} />
          <Typography variant="body1" className="text-lg text-green-700 font-semibold">
            Votre rôle dans ce club est : <span className="text-green-900">{club.roleName}</span>
          </Typography>
        </div>
      ) : club.statutDemande === "REFUSE" ? (
        <div className="flex items-center space-x-2">
          <FaUserShield className="text-red-500" size={20} />
          <Typography variant="body1" className="text-lg text-red-700 font-semibold">
            Votre demande  d'integration a été refusée. Veuillez contacter un administrateur.
          </Typography>
        </div>
      ) : club.statutDemande === "EN_COURS" ? (
        <div className="flex items-center space-x-2">
          <FaUserShield className="text-yellow-500" size={20} />
          <Typography variant="body1" className="text-lg text-yellow-700 font-semibold">
            Votre demande d'integration est en cours de traitement. Merci de patienter.
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default ClubIntegration;
