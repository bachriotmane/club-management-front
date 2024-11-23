import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { AiOutlineInstagram, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCalendar, BsPeople } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { getClubById, deleteClub ,editClub} from "../../repositories/clubs.repository";
import { deleteImage, editImage } from "../../repositories/image.repository";
import { getImage } from "../../repositories/image.repository";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent";
import ErrorMessage from "../../shared/components/utili/ErrorComponent";
import apiErrorHandler from "../../shared/components/utili/apiErrorHandler";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import { IoMdClose } from "react-icons/io";

const ClubDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setLogoUrl] = useState(null);
  const [studentsImages, setStudentsImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChoice, setDeleteChoice] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); 
  const [errorDelete, setErrorDelete] = useState(null); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorValidation, setErrorValidation] = useState([]);
  const [clubFormData,setClubFormData]=useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditClubModalOpen, setIsEditClubModalOpen] = useState(false);
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);



  const activityColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
  ];

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const data = await getClubById(uuid);
        if (data.errorCode) {
          throw new Error(data.errorMessage);
        }
        setClub(data.data);
        setClubFormData(data.data);

        if (data.data.logo) {
          const imageUrl = await getImage(data.data.logo);
          setLogoUrl(imageUrl);
        }

        const studentImages = await Promise.all(
          data.data.profilsDetailsDto.map(async (student) => {
            if (student.imgProfile) {
              return await getImage(student.imgProfile);
            }
            return "/default-profile.png"; 
          })
        );
        setStudentsImages(studentImages);
      } catch (err) {
        const errorMessage = apiErrorHandler(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [uuid]);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  const handleEditeClick = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteChoice = (choice) => {
    setDeleteChoice(choice);
    setIsDeleteModalOpen(false);
    setIsConfirmModalOpen(true);
  };
  
  const handleEditChoice = (choice) => {
    if(choice === "image"){
      setIsEditImageModalOpen(true); 
      setIsEditClubModalOpen(false);
    } else{
      setIsEditImageModalOpen(false); 
      setIsEditClubModalOpen(true);
    }
    setIsEditModalOpen(false);
  };


  const handleConfirmDelete = async () => {
    try {
      if (deleteChoice === "image") {
        await deleteImage(club.logo);
        setLogoUrl(null);
        setStatusMessage("Image deleted successfully!");
      } else if (deleteChoice === "club") {
        await deleteClub(club.uuid);
        setClub(null); 
        setStatusMessage("Club deleted successfully!");
        navigate("/clubs");
      }
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      setErrorDelete(errorMessage);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setIsConfirmModalOpen(false);
    setIsEditModalOpen(false);
    setIsEditClubModalOpen(false);
    setIsEditImageModalOpen(false);
    setErrorValidation([]);
    setErrorDelete(null);
    setClubFormData(club);
    setSelectedImage(null);
  };
  

  const closeMessage = (setMessage) => {
    setMessage(null);
  };
  const handleEditClubInfo = async () => {
    try {
      const clubEditRequest = {
        nom: clubFormData.nom,
        description: clubFormData.description,
        instagramme: clubFormData.instagramme,
        activites: clubFormData.activites,
      };
  
      const updatedClub = await editClub({
        clubId: clubFormData.uuid,
        clubEditRequest,
      });
  
      setClub(updatedClub);
      setStatusMessage("Club modifié avec succès !");
      setErrorValidation([]);
      setIsEditClubModalOpen(false);
      setClubFormData(updatedClub);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
    
        const errors = [
          errorData.nom,
          errorData.description,
          errorData.activites,
          errorData.message,
        ].filter(Boolean); 
    
        setErrorValidation(errors); ;
      } else {
        const errorMessage = apiErrorHandler(error);
        setErrorDelete(errorMessage);
      }
    }
  };
  
  const handleSubmitImageEdit = async () => {
    if (!selectedImage || !club.uuid) {
      setErrorDelete("Aucune image ou ID de club fourni.");
      return;
    }
  
    try {
      const dto = {
        uuidImage: selectedImage.uuid,  
        typeObjet: "club",             
        uuidObjet: club.uuid           
      };
  
      const imageUrl = await editImage(dto, selectedImage);  
      setLogoUrl(imageUrl);
      setIsEditImageModalOpen(false);
      setSelectedImage(null);
      setStatusMessage("Club modifié avec succès !");
      setErrorValidation([])
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      setErrorValidation([errorMessage]);  
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubFormData({
      ...clubFormData,
      [name]: value,
    });
  };

  const handleActivitesChange = (e) => {
    const value = e.target.value.split(','); 
    setClubFormData({
      ...clubFormData,
      activites: value,
    });
  };


  useEffect(() => {
    if (statusMessage || errorDelete) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
        setErrorDelete(null);
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [statusMessage, errorDelete]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage title="Erreur" description={error} />;
  }

  return (
    <header className="bg-white p-6 lg:p-10">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        &larr; Retour
      </button>

      <div className="container mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
        <img
          src={imageUrl || "/default-image.jpg"}
          alt={club.nom}
          className="h-[25rem] w-full rounded-lg object-cover"
        />

        <div className="flex flex-col h-full">
          <Typography variant="h2" color="blue-gray" className="font-bold text-3xl mb-3">
            {club.nom}
          </Typography>

          <div className="flex items-center mb-4">
            {club.profilsDetailsDto.map((student, index) => (
              <div key={student.uuid} className="flex flex-col items-center mr-2">
                <img
                  src={studentsImages[index] || "/default-profile.png"}
                  alt={student.nom}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={() => navigate(`/profile/${student.uuid}`)}
                />
                <span className="text-xs font-medium mt-1">{student.nom}</span>
              </div>
            ))}

            <div className="flex flex-col items-center ml-4 text-blue-500 cursor-pointer">
              <span
                className="text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 hover:underline"
                onClick={() => navigate(`/club/${uuid}/membres`)}
              >
                Voir tous
              </span>
              {club.nbrMembres - club.profilsDetailsDto.length > 0 && (
                <span className="text-xs font-medium mt-1 text-gray-500">
                  +{club.nbrMembres - club.profilsDetailsDto.length}
                </span>
              )}
            </div>
          </div>

          <Typography variant="paragraph" color="gray" className="mb-4">
            {club.description}
          </Typography>

          <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
            Activités :
          </Typography>
          <div className="flex flex-wrap gap-2 mb-4">
            {club.activites.map((activity, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${activityColors[index % activityColors.length]}`}
              >
                {activity}
              </span>
            ))}
          </div>

          <div className="text-gray-500 text-sm mb-6">
            <p className="flex items-center">
              <BsCalendar className="mr-2 text-blue-500" /> Date de création :{" "}
              {new Date(club.createdAt).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <BsPeople className="mr-2 text-green-500" /> Nombre de membres :{" "}
              {club.nbrMembres}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-auto relative">
            <a
              href={club.instagramme}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
              aria-label="Instagram"
            >
              <AiOutlineInstagram size={28} />
            </a>

            <div className="absolute bottom-0 right-0 flex space-x-4 mb-4">
              <SecureComponenet role="ROLE_USER" clubId={club.uuid} requiredClubRole="ADMIN">
                <button className="text-gray-600 hover:text-gray-700"
                 aria-label="Edit Club"
                 onClick={handleEditeClick}

                 >
                  <BiEditAlt size={24} />
                </button>
                <button
                  className="text-red-500 hover:text-red-600"
                  aria-label="Delete Club"
                  onClick={handleDeleteClick}
                >
                  <RiDeleteBinLine size={24} />
                </button>
              </SecureComponenet>
            </div>
          </div>
        </div>
      </div>

   {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Que souhaitez-vous supprimer ?</h2>
            <button
              onClick={() => handleDeleteChoice("image")}
              className="text-red-600 mb-4 flex items-center"
            >
              <AiOutlineDelete className="mr-2" />
              Supprimer l'image
            </button>
            <button
              onClick={() => handleDeleteChoice("club")}
              className="text-red-600 flex items-center"
            >
              <AiOutlineDelete className="mr-2" />
              Supprimer le club
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 mt-4 flex items-center justify-center"
            >
              <IoMdClose className="mr-2" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-lg font-bold mb-4">Êtes-vous sûr ?</h2>
            <p>{deleteChoice === "image" ? "Confirmer la suppression de l'image ?" : "Confirmer la suppression du club ?"}</p>
            <button
              onClick={handleConfirmDelete}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Confirmer
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
{isEditModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
    onClick={handleCancel}
  >
    <div
      className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm relative"
      onClick={(e) => e.stopPropagation()} 
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Que souhaitez-vous modifier ?
      </h2>
      <button
        onClick={() => handleEditChoice("image")}
        className="text-blue-600 mb-4 flex items-center hover:bg-blue-100 hover:text-blue-800 p-2 rounded"
      >
        <AiOutlineEdit className="mr-2" />
        Modifier l'image
      </button>
      <button
        onClick={() => handleEditChoice("club")}
        className="text-blue-600 flex items-center hover:bg-blue-100 hover:text-blue-800 p-2 rounded"
      >
        <AiOutlineEdit className="mr-2" />
        Modifier les infos du club
      </button>
      <button
        onClick={handleCancel}
        className="text-gray-600 mt-4 flex items-center justify-center hover:bg-gray-100 p-2 rounded"
      >
        <IoMdClose className="mr-2" />
        Annuler
      </button>
    </div>
  </div>
)}


{isEditClubModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Modifier les informations du club</h2>

      <div className="mb-4">
        <label htmlFor="nom" className="block text-sm font-semibold">
          Nom du club <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nom"
          value={clubFormData.nom}
          onChange={handleChange}
          placeholder="Nom du club"
          className="block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-semibold">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={clubFormData.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instagramme" className="block text-sm font-semibold">
          Instagram du club
        </label>
        <input
          type="text"
          name="instagramme"
          value={clubFormData.instagramme}
          onChange={handleChange}
          placeholder="Instagram du club"
          className="block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="activites" className="block text-sm font-semibold">
          Activités <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="activites"
          value={Array.isArray(clubFormData.activites) ? clubFormData.activites.join(",") : ""}
          onChange={handleActivitesChange}
          placeholder="Activités (séparées par des virgules)"
          className="block w-full p-2 border rounded"
        />
      </div>

      {Array.isArray(errorValidation) && errorValidation.length > 0 && (
        <div className="mb-4 text-red-500 text-sm">
          {errorValidation.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleEditClubInfo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Enregistrer
        </button>
        <button
          onClick={handleCancel}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}
{isEditImageModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Modifier l'image du club</h2>

      <div className="mb-4">
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : (imageUrl || "/default-image.jpg")}
          alt="Aperçu de l'image"
          className="w-full h-[15rem] rounded"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files[0])}
        className="mb-4 border p-2 w-full rounded"
      />

      {Array.isArray(errorValidation) && errorValidation.length > 0 && (
        <div className="mb-4 text-red-500 text-sm">
          {errorValidation.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmitImageEdit}
          disabled={!selectedImage}
          className={`px-4 py-2 rounded-lg text-white ${selectedImage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Sauvegarder
        </button>
        <button
          onClick={handleCancel}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Annuler
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

{errorDelete && (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
    <span>{errorDelete}</span>
    <button className="ml-2" onClick={() => closeMessage(setErrorDelete)}>
      <IoMdClose size={20} />
    </button>
  </div>
)}
</header>
  );
};

export default ClubDetails;
