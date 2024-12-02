import React, { useState, useEffect } from "react";
import { getDemandeDetails } from "../../repositories/demande.repository.js";
import { useParams } from "react-router-dom";

const DemandeDetails = () => {
  const [demande, setDemande] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  // Fetch data for a single demande
  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await getDemandeDetails(params.id);
        setDemande(response);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDemande();
  }, [params.id]);

  if (error) {
    return <div className="text-center text-red-600 mt-4">{error}</div>;
  }

  if (!demande) {
    return <div className="text-center text-orange-600 mt-4">Chargement...</div>;
  }

  return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-orange-700 text-center mb-6">
          Détails de la Demande
        </h1>
        <div className="text-black p-6 rounded-lg shadow-lg">
          {/* Entête : Demandeur */}
          <div className="flex items-center mb-4 border-b border-orange-500 pb-4">
            <img
                src={""}
                alt={demande.demandeurUserName}
                className="w-16 h-16 rounded-full mr-4 border-2 border-orange-500"
            />
            <div>
              <h2 className="text-xl font-semibold text-orange-500">
                {demande.demandeurUserName}
              </h2>
            </div>
          </div>

          {/* Contenu basé sur le type */}
          <div className="mb-4">
            {demande.typeDemande === "CREATION_CLUB" && (
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Création de Club
                  </h3>
                  <p>
                    <span className="font-medium">Instagram :</span>{" "}
                    <a
                        href={demande.instagrammeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 underline"
                    >
                      {demande.instagrammeLink}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Description :</span> {demande.creationDesc}
                  </p>
                  {(!(demande.activities) || demande.activities.length !== 0) && (
                      <p>
                        <span className="font-medium">Activités :</span> {demande.activities.join(", ")}
                      </p>
                  )}
                </div>
            )}

            {demande.typeDemande === "INTEGRATION_CLUB" && (
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Intégration à un Club
                  </h3>
                  <p>
                    <span className="font-medium">Nom du Club :</span> {demande.clubName}
                  </p>
                  <p>
                    <span className="font-medium">Motivation :</span> {demande.motivation}
                  </p>
                </div>
            )}

            {demande.typeDemande === "EVENEMENT" && (
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Événement
                  </h3>
                  <p>
                    <span className="font-medium">Nom de l'Événement :</span> {demande.eventName}
                  </p>
                  <p>
                    <span className="font-medium">Lieu :</span> {demande.location}
                  </p>
                  <p>
                    <span className="font-medium">Budget :</span> ${demande.budget.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Date :</span>{" "}
                    {new Date(demande.eventDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Description :</span> {demande.eventDesc}
                  </p>
                </div>
            )}
          </div>

          {/* Statut */}
          <div className="mt-4 text-center">
          <span
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                  demande.statutDemande === "ACCEPTE"
                      ? "bg-green-600"
                      : demande.statutDemande === "REFUSE"
                          ? "bg-red-600"
                          : "bg-orange-600"
              }`}
          >
            {demande.statutDemande}
          </span>
          </div>
        </div>
      </div>
  );
};

export default DemandeDetails;
