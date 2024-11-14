import { Typography } from "@material-tailwind/react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCalendar, BsPeople, BsPerson } from "react-icons/bs";
import logo from "../../assets/bac.jpeg";
import profileImage from "../../assets/bac.jpeg";
import { useNavigate } from "react-router-dom";

const ClubDetails = () => {
  const club = {
    name: "Club Bac",
    description:
      "Le Passion Auto Club est dédié aux passionnés de voitures classiques et modernes. Il regroupe des amateurs d'automobile pour partager leur amour de la mécanique, organiser des sorties en groupe et participer à des événements autour de l'automobile.",
    instagram: "https://instagram.com/club_bac",
    image: logo,
    createdAt: "12/01/2025",
    memberCount: 150,
    founder: "BACHIR OTMANE",
    activities: ["Expositions", "Rencontres", "Sorties", "Concours"],
    students: [
      { id: 1, name: "Bourich", image: profileImage },
      { id: 2, name: "Bourich", image: profileImage },
      { id: 3, name: "Bourich", image: profileImage },
      { id: 4, name: "Bourich", image: profileImage },
      { id: 5, name: "Bourich", image: profileImage },
      { id: 6, name: "Bourich", image: profileImage },
    ],
  };

  const navigate = useNavigate();

  const activityColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
  ];

  return (
    <header className="bg-white p-6 lg:p-10">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        &larr; Retour
      </button>
      <div className="container mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
        
        <img
          src={club.image}
          alt="Club"
          className="h[25rem] w-full rounded-lg object-cover" 
        />

        <div className="flex flex-col h-full"> 
          <Typography variant="h2" color="blue-gray" className="font-bold text-3xl mb-3">
            {club.name}
          </Typography>

          <div className="flex items-center mb-4">
            {club.students.map((student) => (
              <div key={student.id} className="flex flex-col items-center mr-2">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-300" 
                />
                <span className="text-xs font-medium mt-1">{student.name}</span>
              </div>
            ))}

            <div className="flex flex-col items-center ml-4 text-blue-500 cursor-pointer hover:underline">
              <span className="text-sm font-medium">voir tous</span>
              <span className="text-xs font-medium mt-1">+98</span>
            </div>
          </div>

          <Typography variant="body1" color="gray" className="mb-4">
            {club.description}
          </Typography>

          <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
            Activités:
          </Typography>
          <div className="flex flex-wrap gap-2 mb-4">
            {club.activities.map((activity, index) => (
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
              <BsCalendar className="mr-2 text-blue-500" /> Date de création : {club.createdAt}
            </p>
            <p className="flex items-center">
              <BsPeople className="mr-2 text-green-500" /> Nombre de membres : {club.memberCount} 
            </p>
            <p className="flex items-center">
              <BsPerson className="mr-2 text-gray-500" /> Fondateur : {club.founder}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-auto relative"> 
            <a
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
              aria-label="Instagram"
            >
              <AiOutlineInstagram size={28} />
            </a>
            <div className="absolute bottom-0 right-0 flex space-x-4 mb-4">
              <button className="text-gray-600 hover:text-gray-700" aria-label="Edit Club">
                <BiEditAlt size={24} />
              </button>
              <button className="text-red-500 hover:text-red-600" aria-label="Delete Club">
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
