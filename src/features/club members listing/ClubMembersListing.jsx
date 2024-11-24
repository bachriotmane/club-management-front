import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClubMembers } from "../../repositories/clubs.repository";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import apiErrorHandler from "../../shared/components/utili/apiErrorHandler";
import ErrorMessage from "../../shared/components/utili/ErrorComponent";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";

const ClubMembersListing = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [nom, setNom] = useState("");
  const [logo, setLogo] = useState("/default-image.jpg");
  const [nbrStudent, setNbrStudent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentName, setStudentName] = useState("");
  const clubId = useParams().uuid;
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getClubMembers({
          uuid: uuid,
          page: page - 1,
          size: 10,
          studentName: studentName,
        });

        const { nomClub, logo, nbrStudent } = data.data;
        setNom(nomClub);
        setLogo(logo || "/default-image.jpg");
        setNbrStudent(nbrStudent || 0);

        setMembers(data.data.membersListDTO.data);
        setTotalPages(data.data.membersListDTO.totalPages);
      } catch (err) {
        const errorMessage = apiErrorHandler(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [uuid, page, studentName]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleProfileClick = (memberUuid) => {
    navigate(`/profile/${memberUuid}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  if (error) {
    return <ErrorMessage title="Erreur" description={error} />;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={handleBackClick}
        className="text-gray-500 hover:text-blue-700 mb-4"
      >
        &#8592; Retour
      </button>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Club Logo"
            className="w-12 h-12 mr-6"
          />
          <h1 className="text-2xl font-semibold mr-8 whitespace-nowrap">
            {nom}
          </h1>
        </div>

        <div className="flex justify-end w-1/3">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>
      </div>

      <div className="mt-2 text-gray-600">
        <strong>Total des étudiants : </strong> {nbrStudent}
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Membre</th>
            <th className="px-4 py-2 border">Date d'Intégration</th>
            <th className="px-4 py-2 border">Filière</th>
            <th className="px-4 py-2 border">Rôle</th>
            <SecureComponenet role='ROLE_USER' clubId={clubId} requiredClubRole={"ADMIN"}>
              <th className="px-4 py-2 border text-center">Actions</th>
            </SecureComponenet>

          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={member.uuid}
              className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-150"}
            >
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border flex items-center space-x-2">
                <img
                  src={member.imgProfile || "/default-profile.png"}
                  alt="Profil"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => handleProfileClick(member.uuid)}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleProfileClick(member.uuid)}
                >
                  {member.firstName || "N/A"} {member.lastName || ""}
                </span>
              </td>
              <td className="px-4 py-2 border text-center">
                {member.dateIntegration || "Non spécifiée"}
              </td>
              <td className="px-4 py-2 border text-center">
                {member.filiere || "Non spécifiée"}
              </td>
              <td className="px-4 py-2 border text-center">{member.role}</td>
              <SecureComponenet role='ROLE_USER' clubId={clubId} requiredClubRole="ADMIN">
                <td className="px-4 py-2 border text-center">
                  <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      aria-label="Edit Member"
                  >
                    <BiEditAlt size={24}/>
                  </button>
                  <button
                      className="text-red-500 hover:text-red-600"
                      aria-label="Delete Member"
                  >
                    <RiDeleteBinLine size={24}/>
                  </button>
                </td>
              </SecureComponenet>

            </tr>
          ))}
        </tbody>
      </table>

      {members.length > 0 && (
          <div className="flex justify-center space-x-2 mt-4">
            <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`px-2 py-1 rounded ${page === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-1 rounded ${page === i + 1 ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className={`px-2 py-1 rounded ${page === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
          >
            Suivant
          </button>
        </div>
      )}
         {loading && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ClubMembersListing;
