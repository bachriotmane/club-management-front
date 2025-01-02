import { useGetAlbumImage } from "../../../repositories/image.repository";
import LoadingSpinner from "../utili/LoadingCompnent";

// eslint-disable-next-line react/prop-types
const ImageCard = ({imageId}) => {
    const {data,error,isError,isLoading} = useGetAlbumImage(imageId);
    
    return (
        <>
            {
                isLoading?
                <div className="h-screen flex justify-center items-start mt-36">
                    <LoadingSpinner></LoadingSpinner>
                </div> :isError ?
                <div className="h-screen flex justify-center items-start mt-36">
                    oops!! {error}
                </div>:
                <div className="h-[300px] flex justify-center items-center ">
                    <img
                        src={data}
                        alt="album image"
                        className="object-cover h-full w-full rounded-lg"
                    />
                </div>
            }
        </>
    )
}

export default ImageCard