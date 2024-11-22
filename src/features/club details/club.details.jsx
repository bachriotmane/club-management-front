import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCalendar, BsPeople, BsPerson } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { getClubById } from "../../repositories/clubs.repository";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent";
import ErrorMessage from "../../shared/components/utili/ErrorComponent";
import apiErrorHandler from "../../shared/components/utili/apiErrorHandler";
import { getImage } from "../../repositories/image.repository";

const ClubDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setLogoUrl] = useState(null);

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
  
        if (data.data.logo) {
          const imageUrl = await getImage(data.data.logo);
          setLogoUrl(imageUrl);
        }
      } catch (err) {
        const errorMessage = apiErrorHandler(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClubData();
  }, [uuid]);
  

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
          className="h-[25rem] w-full rounded-lg object-cover "
        />

        <div className="flex flex-col h-full">
          <Typography
            variant="h2"
            color="blue-gray"
            className="font-bold text-3xl mb-3"
          >
            {club.nom}
          </Typography>

          <div className="flex items-center mb-4">
            {club.profilsDetailsDto.map((student) => (
              <div
                key={student.uuid}
                className="flex flex-col items-center mr-2"
              >
                <img
                  src={student.imgProfile || "/default-profile.png"}
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

          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold mb-2"
          >
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
              <button
                className="text-gray-600 hover:text-gray-700"
                aria-label="Edit Club"
              >
                <BiEditAlt size={24} />
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                aria-label="Delete Club"
              >
                <RiDeleteBinLine size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClubDetails;
