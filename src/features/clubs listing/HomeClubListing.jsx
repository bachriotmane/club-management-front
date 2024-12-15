import React, { useState, useEffect } from "react";
import { getClubsHome } from "../../repositories/clubs.repository";
import { getImage } from "../../repositories/image.repository";
import Carousel from "../home/components/Carousel";
import ClubCard from "../../shared/components/cards/ClubCard";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const HomeClubListing = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubsData = async () => {
      console.log("HomeClubListing: Début du fetch des clubs");
      setLoading(true);
      try {
        const data = await getClubsHome({ limit: 7 });
        console.log("HomeClubListing: Données reçues de l'API getClubsHome:", data);

        // Ajout de la gestion des images
        const clubsWithImages = await Promise.all(
          data.data.map(async (club) => {
            try {
              const logoUrl = club.logo ? await getImage(club.logo) : "default-image.jpg";
              console.log(`HomeClubListing: Logo chargé pour le club ${club.nom}:`, logoUrl);
              return { ...club, logo: logoUrl };
            } catch (error) {
              console.error(
                `HomeClubListing: Erreur lors du chargement de l'image pour le club ${club.nom}:`,
                error
              );
              return { ...club, logo: "default-image.jpg" }; // Fallback
            }
          })
        );

        console.log("HomeClubListing: Clubs avec les images chargées:", clubsWithImages);
        setClubs(clubsWithImages);
      } catch (error) {
        console.error("HomeClubListing: Erreur lors du fetch des clubs:", error);
        setError("Erreur réseau lors du chargement des clubs");
      } finally {
        setLoading(false);
        console.log("HomeClubListing: Fin du fetch des clubs");
      }
    };

    fetchClubsData();
  }, []);

  if (loading) {
    console.log("HomeClubListing: Chargement en cours...");
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error("HomeClubListing: Une erreur s'est produite:", error);
    return (
      <div className="flex justify-center items-center w-full h-20 bg-red-200 rounded-lg mt-20">
        <div className="text-center text-black font-bold text-2xl">
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

  console.log("HomeClubListing: Affichage du carousel avec les clubs:", clubs);

  return (
    <div className="space-y-10">
      <Carousel 
        items={clubs} 
        CardComponent={ClubCard} 
        title="Clubs populaires" 
        redirectUrl="/clubs" 
      />
    </div>
  );
};

export default HomeClubListing;
