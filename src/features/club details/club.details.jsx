import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { AiOutlineInstagram} from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCalendar, BsPeople, BsPerson } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import {  deleteClub ,editClub} from "../../repositories/clubs.repository";
import { deleteImage, editImage } from "../../repositories/image.repository";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent";
import ErrorMessage from "../../shared/components/utili/ErrorComponent";
import apiErrorHandler from "../../shared/components/utili/apiErrorHandler";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import { toast } from "react-toastify";
import ClubIntegration from "./components/clubIntegration.jsx";
import EditImageModal from "./components/EditImageModal.jsx";
import EditClubModal from "./components/editClubModal.jsx";
import EditChoiceModal from "./components/editModal.jsx";
import ConfirmModal from "./components/confirmModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import ErrorNotification from "./components/errorMessage.jsx";
import StatusNotification from "./components/statusMessage.jsx";
import { fetchClubData } from "./services/clubServices.jsx";

import { IoMdClose } from "react-icons/io";
import { IoAlbums } from "react-icons/io5";

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
    fetchClubData(uuid, setClub, setClubFormData, setLogoUrl, setStudentsImages, setLoading, setError);
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
        toast.success("Club deleted successfully!");
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

  const handleAlbumClick = ()=>{
    const clubId = uuid;
    navigate(`/club/albums/${clubId}`);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage title="Erreur" description={error} />;
  }

  return (
    <header className="bg-white p-6 lg:p-10">
   <div className="container mx-auto flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
          &larr; Retour
        </button>
        <ClubIntegration club={club} navigate={navigate} />
      </div>


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
          <div className="flex justify-between">
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
            <button
              onClick={()=>handleAlbumClick()}
              className="bg-btnColor p-3 h-10 rounded-lg flex gap-2 items-center text-white"
            >
                <IoAlbums />
                Album
            </button>
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
            <p className="flex items-center">
              <BsPerson className="mr-2 text-gray-500" /> Fondateur :{" "}
              {club.nomFondateur || "Non spécifié"}
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
 <DeleteModal
        isOpen={isDeleteModalOpen}
        handleCancel={handleCancel}
        handleDeleteChoice={handleDeleteChoice}
      />
  <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDelete}
        deleteChoice={deleteChoice}
      />
  <EditChoiceModal
        isOpen={isEditModalOpen}
        handleCancel={handleCancel}
        handleEditChoice={handleEditChoice}
      />

 <EditClubModal
        isOpen={isEditClubModalOpen}
        clubFormData={clubFormData}
        errorValidation={errorValidation}
        handleChange={handleChange}
        handleActivitesChange={handleActivitesChange}
        handleEditClubInfo={handleEditClubInfo}
        handleCancel={handleCancel}
      />
 <EditImageModal
        isOpen={isEditImageModalOpen}
        selectedImage={selectedImage}
        imageUrl={imageUrl}
        errorValidation={errorValidation}
        setSelectedImage={setSelectedImage}
        handleSubmitImageEdit={handleSubmitImageEdit}
        handleCancel={handleCancel}
      />

<StatusNotification
        statusMessage={statusMessage}
        closeMessage={closeMessage}
        setStatusMessage={setStatusMessage}
      />

<ErrorNotification
        errorDelete={errorDelete}
        closeMessage={closeMessage}
        setErrorDelete={setErrorDelete}
      />

</header>
  );
};

export default ClubDetails;
