import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import { useFetchClubAlbums } from "../../repositories/albumRepository.js";
import AlbumCard from "../../shared/components/cards/AlbumCard.jsx";
import { useParams } from "react-router-dom";

const AlbumListing = () => {
  const {clubId} = useParams();
  const {data,isLoading,error,isError} =useFetchClubAlbums(clubId);
  console.log(data);
  
  if(isLoading){
    return(
      <div className="h-screen flex justify-center items-start mt-36">
        <LoadingSpinner></LoadingSpinner>
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
