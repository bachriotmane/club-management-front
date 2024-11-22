import { useState } from "react";
import DemandeCreation from "./components/demande.creation";
import DemandeIntegration from "./components/Demande.Integrations";
import DemandeOrganization from "./components/demande.organization";

const DeposeDemande = () => {
  const [demande, setDemande] = useState("IN");

  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-3 text-sm mb-6">
        <label htmlFor="demandeType" className="font-bold text-lg text-gray-900">
          Sélectionnez une demande
        </label>
        <select
          id="demandeType"
          className="w-1/3 p-2 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={demande}
          onChange={(e) => setDemande(e.target.value)}
        >
          <option value="IN">Demande d&apos;intégration</option>
          <option value="CR">Demande de création d&apos;un club</option>
          <option value="OR">Demande d&apos;organisation d&apos;un événement</option>
        </select>
      </div>
      
      {demande === "IN" && <DemandeIntegration />}
      {demande === "CR" && <DemandeCreation />}
      {demande === "OR" && <DemandeOrganization />}
    </div>
  );
};

export default DeposeDemande;
