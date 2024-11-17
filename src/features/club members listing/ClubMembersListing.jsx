import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClubMembers } from "../../repositories/clubs.repository";

const ClubMembersListing = () => {
  const { uuid } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
    <div>
      <h1>Membres du club</h1>
    </div>
  );
};

export default ClubMembersListing;
