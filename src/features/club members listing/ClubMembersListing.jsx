import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClubMembers, getMemberRoles } from "../../repositories/clubs.repository";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import apiErrorHandler from "../../shared/components/utili/apiErrorHandler";
import ErrorMessage from "../../shared/components/utili/ErrorComponent";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import { getImage } from "../../repositories/image.repository.js";
import { IoMdClose } from "react-icons/io";
import { deleteIntegration, editRoleStudent } from "../../repositories/demande.repository.js";

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
  const [newRole, setNewRole] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [roles, setRoles] = useState([]);
  const [errorValidation, setErrorValidation] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null); 
  const [errorRed, setErrorRed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


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

        const { nomClub, logo, nbrStudent ,} = data.data;
        setNom(nomClub);
        if (logo) {
          const imageUrl = await getImage(logo);
          setLogo(imageUrl || "/default-image.jpg");
        }else {
          setLogo(logo || "/default-image.jpg");
        }
        setNbrStudent(nbrStudent || 0);
        const membersWithImages = await Promise.all(data.data.membersListDTO.data.map(async (member) => {
          if (member.imgProfile) {
            const imageUrl = await getImage(member.imgProfile);
            return { ...member, imgProfile: imageUrl || "/default-profile.png" };
          }
          return { ...member, imgProfile: "/default-profile.png" };
        }));
        setMembers(membersWithImages);
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
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const data = await getMemberRoles();
        setRoles(data); 
      } catch (error) {
        const errorMessage = apiErrorHandler(err);
        setError(errorMessage);
            } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);
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
  const openModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
    setNewRole(member.memberRole); 
    setFunctionName(member.roleName);
  };
  const handleSave = async () => {
    try {
      const updatedMember = await editRoleStudent({
        uuid: selectedMember.uuidIntegration,
        roleName: functionName,
        memberRole: newRole, 
      });
      const imageUrl = updatedMember.imgProfile != null ? await getImage(updatedMember.imgProfile) : null; 
      const updatedMemberWithImage = { ...updatedMember, imgProfile: imageUrl || "/default-profile.png" };
      setStatusMessage("Member role updated successfully!");
      setMembers((prevMembers) =>
         prevMembers.map((member) =>
             member.uuid === selectedMember.uuid ? updatedMemberWithImage : member
         )
     );
      closeModal(); 
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      setErrorValidation([errorMessage]);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setErrorValidation([]);
    setSelectedMember(null);
  };
  const handleConfirmDelete = async () => {
    if (!selectedMember) return;
    try {
      await deleteIntegration(selectedMember.uuidIntegration); 
      setStatusMessage("Member deleted successfully!");
      setMembers(members.filter(member => member.uuid !== selectedMember.uuid));  
      setIsConfirmModalOpen(false); 
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      setErrorRed(errorMessage);
    }
  };
  const handleCancel = () => {
    setIsConfirmModalOpen(false); 
  };

  useEffect(() => {
    if (statusMessage || errorRed) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
        setErrorRed(null);
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [statusMessage, errorRed]);
  const closeMessage = (setMessage) => {
    setMessage(null);
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
            <th className="px-4 py-2 border">Fonction</th>
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
              <td className="px-4 py-2 border text-center">{member.memberRole}</td>
              <td className="px-4 py-2 border text-center">{member.roleName}</td>
              <SecureComponenet role='ROLE_USER' clubId={clubId} requiredClubRole="ADMIN">
                <td className="px-4 py-2 border text-center">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => openModal(member)}
                  aria-label="Edit Member"
                >
                    <BiEditAlt size={24}/>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setIsConfirmModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700"
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedMember.imgProfile || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="font-medium">{selectedMember.firstName} {selectedMember.lastName}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Rôle *
              </label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="function">
                Fonction *
              </label>
              <input
                id="function"
                type="text"
                value={functionName }
                onChange={(e) => setFunctionName(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
         {Array.isArray(errorValidation) && errorValidation.length > 0 && (
        <div className="mb-4 text-red-500 text-sm">
          {errorValidation.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
     </div>
        <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
         {loading && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )}
 {isConfirmModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
    <div className="bg-white rounded-lg p-8 w-1/3 max-w-3xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Êtes-vous sûr de vouloir supprimer ce membre&nbsp;
          <span className="font-bold text-indigo-600">
            {selectedMember ? selectedMember.firstName || "N/A" : "N/A"}&nbsp;
            {selectedMember ? selectedMember.lastName || "" : ""}
          </span>
        </h2>
    
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleConfirmDelete(selectedMember?.uuidIntegration)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Oui
        </button>

        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Non
        </button>
      </div>
    </div>
  </div>
)}


{statusMessage && (
  <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
    <span>{statusMessage}</span>
    <button className="ml-2" onClick={() => closeMessage(setStatusMessage)}>
      <IoMdClose size={20} />
    </button>
  </div>
)}


{errorRed && (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
    <span>{errorDelete}</span>
    <button className="ml-2" onClick={() => closeMessage(setErrorRed)}>
      <IoMdClose size={20} />
    </button>
  </div>
)}
    </div>
  );
};

export default ClubMembersListing;
