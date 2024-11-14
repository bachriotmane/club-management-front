import PublicationCard from "../../shared/components/cards/PublicationCard";
import FilterHeader from "./components/filter-header.jsx";
import {useState} from "react";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const publications = [
  {
    id: 1,
    titre: "Club de Photographie",
    description:
      "Découvrez le monde à travers l'objectif avec notre club de photographie.",
    date: "2024-11-11T09:30:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 2,
    titre: "Club de Robotique",
    description: "Apprenez à construire et à programmer des robots avec nous !",
    date: "2024-11-12T14:00:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 3,
    titre: "Club de Cuisine",
    description:
      "Partagez des recettes et apprenez des techniques de cuisine avec les meilleurs.",
    date: "2024-11-13T10:00:00",
    image: "bac.jpeg",
    isPublic: false,
  },
  {
    id: 4,
    titre: "Club de Lecture",
    description:
      "Rejoignez-nous pour discuter de vos livres préférés et découvrir de nouvelles lectures.",
    date: "2024-11-14T16:30:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 5,
    titre: "Club de Musique",
    description:
      "Explorez différents styles de musique et développez vos compétences musicales.",
    date: "2024-11-15T18:00:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 6,
    titre: "Club de Théâtre",
    description:
      "Développez votre expression et apprenez les bases de l'art dramatique.",
    date: "2024-11-16T19:00:00",
    image: "bac.jpeg",
    isPublic: false,
  },
];

const PublicationsList = () => {
  const [currentTab, setCurrentTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("last24Hours");
  const [searchKey, setSearchKey] = useState("");

  if(isLoading){
    return <div className="">
      <LoadingSpinner></LoadingSpinner>
    </div>
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <FilterHeader searchTerm={searchKey} setSearchTerm={setSearchKey} activeTab={currentTab} setActiveTab={setCurrentTab} filterDate={filterDate} setFilterDate={setFilterDate}></FilterHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((item) => (
          <PublicationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
