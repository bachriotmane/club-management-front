import React, { useState, useEffect } from "react";
import { getClubsHome } from "../../repositories/clubs.repository"; 
import Carousel from "../home/components/Carousel"; 
import ClubCard from "../../shared/components/cards/ClubCard"; 
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 

const HomeClubListing = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubsData = async () => {
      setLoading(true);
      try {
        const data = await getClubsHome({ limit: 7 });
        setClubs(data.data); 
      } catch (error) {
        setError("Network Error");
      } finally {
        setLoading(false);
      }
    };

    fetchClubsData();
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-20 bg-red-200 rounded-lg mt-20">
        <div className="text-center text-black font-bold text-2xl">
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

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
