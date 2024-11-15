import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const imageTest =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzTWQoCUbRNdiyorem5Qp1zYYhpliR9q0Bw&s";
const demandes = [
  {
    id: 1,
    date: "13/05/2024",
    demandeur: { name: "John Doe", image: imageTest },
    status: "Accepte",
    type: "Demande d'intégration",
  },
  {
    id: 2,
    date: "22/05/2024",
    demandeur: { name: "Jane Smith", image: imageTest },
    status: "Accepte",
    type: "Demande de création",
  },
  {
    id: 3,
    date: "15/06/2024",
    demandeur: { name: "Alice Johnson", image: imageTest },
    status: "En cours",
    type: "Demande d'organisation d'événements",
  },
  {
    id: 4,
    date: "06/09/2024",
    demandeur: { name: "Bob Brown", image: imageTest },
    status: "En cours",
    type: "Demande d'intégration",
  },
  {
    id: 5,
    date: "25/09/2024",
    demandeur: { name: "Charlie Black", image: imageTest },
    status: "Rejete",
    type: "Demande de création",
  },
];

const DemandesListing = () => {
  const navigate = useNavigate();
  const [filteredDemandes, setFilteredDemandes] = useState(demandes);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleFilter = (filterType) => {
    setShowFilterMenu(false); // Fermer le menu après sélection
    if (filterType === "date") {
      setFilteredDemandes(
        [...demandes].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } else {
      setFilteredDemandes(
        demandes.filter((demande) => demande.type === filterType)
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="my-2 text-2xl font-bold">Demandes</h1>
        <button
          onClick={() => navigate("/ajouter-demande")}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out transform hover:-translate-y-0.5"
        >
          <span className="mr-2">Ajouter une demande</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Bouton de filtrage */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
        >
          Filtrer les demandes
        </button>
        {showFilterMenu && (
          <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <ul className="py-1 text-gray-700">
              <li>
                <button
                  onClick={() => handleFilter("date")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Par Date
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Demande d'intégration")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Demande d'intégration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Demande de création")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Demande de création
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleFilter("Demande d'organisation d'événements")
                  }
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Demande d'organisation d'événements
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Tableau des demandes */}
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Demandeur</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemandes.map((demande) => (
            <tr
              key={demande.id}
              onClick={() => navigate("/demandes/1")}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="px-4 py-2 border text-center">#{demande.id}</td>
              <td className="px-4 py-2 border flex items-center space-x-2">
                <img
                  src={demande.demandeur.image}
                  alt="Demandeur"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hover:underline hover:text-blue-700">
                  {demande.demandeur.name}
                </span>
              </td>
              <td className="px-4 py-2 border text-center">{demande.date}</td>
              <td className="px-4 py-2 border text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white ${getStatusClass(
                    demande.status
                  )}`}
                >
                  {demande.status}
                </span>
              </td>
              <td className="px-4 py-2 border text-center">
                <button className="text-green-500 hover:text-green-700 mx-1">
                  &#10004;
                </button>
                <button className="text-red-500 hover:text-red-700 mx-1">
                  &#10006;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Accepte":
      return "bg-green-400";
    case "En cours":
      return "bg-yellow-400";
    case "Rejete":
      return "bg-red-400";
    default:
      return "bg-gray-200";
  }
};

export default DemandesListing;
