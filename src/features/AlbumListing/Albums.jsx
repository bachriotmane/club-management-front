import { FaPlusSquare } from "react-icons/fa";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import AlbumListing from "./AlbumListing.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Albums = () => {
    const {clubId} = useParams();
    const navigate = useNavigate();
  return (

    <div className="container w-full mx-auto px-4">
        <SecureComponenet role='ROLE_USER'>
            <div className="flex justify-between mb-2.5  items-center w-full">
            <button onClick={()=>navigate(-1)}>
                <IoMdArrowBack className="text-btnColor text-3xl"/>
            </button>
                <button
                    onClick={() => navigate(`/albums/${clubId}`)}
                    className=" flex px-3 gap-2 items-center  bg-orange-500 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 "
                >
                    <FaPlusSquare className=" box-border text-xl font-bold "/>
                    Ajouter un neveaux Album
                </button>
            </div>
        </SecureComponenet>

        <AlbumListing />
    </div>
  )
}

export default Albums