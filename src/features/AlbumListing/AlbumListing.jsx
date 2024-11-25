import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import { useFetchClubAlbums } from "../../repositories/albumRepository.js";
import AlbumCard from "../../shared/components/cards/AlbumCard.jsx";
import { useParams } from "react-router-dom";
import logo from '../../assets/not-items-found.png';

const AlbumListing = () => {
  const {clubId} = useParams();
  const {data,isLoading} =useFetchClubAlbums(clubId);
  
  if(isLoading){
    return(
      <div className="h-screen flex justify-center items-start mt-36">
        <LoadingSpinner></LoadingSpinner>
      </div>
    )
  }
  if(data && data.length === 0){
    return (
      <div className="flex flex-col items-center justify-center mt-20 ">
          <img className="w-1/6 h-1/4 object-cover" src={logo} alt="salam"/>
          <span className="font-bold text-2xl">Il n'y a pas d'albums pour ce club jusqu'à ce moment.</span>
      </div>
    )
  }
  if(data){
    return (
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {
          data.map(album =>{
            return <AlbumCard 
              key={album.albumId} 
              title={album.title} 
              location={album.location} 
              date={album.date}
              images={album.imagesUrl}
            /> ;
          })
        }
      </div>
    );
  }
}
  
export default AlbumListing;
