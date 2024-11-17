import {Typography} from "@material-tailwind/react";
import {AiOutlineClockCircle, AiOutlineInstagram} from "react-icons/ai";
import {BiArrowBack, BiEditAlt} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import logo from "../../assets/bac.jpeg";
import {useNavigate, useParams} from "react-router-dom";
import {MdLocationOn} from "react-icons/md";
import {useEffect, useState} from "react";
import {getEventById} from "../../repositories/evenements.repository.js";
import ErrorComponent from "../../shared/components/utili/ErrorComponent.jsx";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const EventDetails = () => {
    const navigate = useNavigate();
    const [event, setEventDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const params = useParams();

    const fetchEvent = async () => {
        const resp = await getEventById(params.id);
        setEventDetails(resp.data);
    };
    useEffect(() => {
        try {
            setIsLoading(true);
            fetchEvent().then(() => {
                    setIsLoading(false);
                }
            ).catch(err=>setError(err));
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (error){
        return <div className="mt-36">
            <ErrorComponent description={error.response ? error.response.data.errorMessage : "Erreur"} title="404!"></ErrorComponent>
        </div>
    }

    if(!event || isLoading) {
        return <div className="flex justify-center items-center mt-36">
            <LoadingSpinner></LoadingSpinner>
        </div>
    }

    return (
        <header className="bg-white p-8 min-h-screen">
            <button onClick={() => navigate(-1)} className="flex items-center text-black text-xl mb-4 space-x-2">
                <BiArrowBack size={30}></BiArrowBack>
                <span>Back</span>
            </button>
            <div className="container mx-auto flex flex-col lg:flex-row items-start gap-10 w-full h-full">
                <div className="flex-shrink-0 w-full lg:w-1/3 h-1/3">
                    <img
                        src={logo}
                        alt="Event"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="flex-grow w-full lg:w-1/2 space-y-3">
                    <div className="flex items-center space-x-1">
                        <img
                            src={logo}
                            alt={event.nom}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                        />
                        <div className="flex flex-col" onClick={()=> navigate("/club/1")}>
              <span className="text-lg font-bold text-gray-800 hover:underline cursor-pointer hover:text-blue-600">
                {event.publisher}
              </span>
                            <span className="text-xs font-bold text-gray-700">{event.membersLength} membres</span>
                        </div>
                    </div>

                    <Typography variant="h1" color="blue-gray" className="text-4xl font-bold text-black">
                        {event.nom}
                    </Typography>
                    <Typography variant="lead" className="text-gray-700 text-lg">
                        {event.description}
                    </Typography>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center space-x-3">
                            <AiOutlineClockCircle size={30} color={"4207F2"}/>
                            <span className="text-lg italic">{event.date ?? "unknown"}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdLocationOn size={34} color={"F27907"}></MdLocationOn>
                            <span className="text-lg italic">{event.location ?? "unknown"}</span>
                        </div>
                        <a className="flex items-center space-x-3" href={event.instagram} >
                            <AiOutlineInstagram size={30} color="F20707"/>
                            <span className="text-lg italic hover:text-blue-500">@{event.instagram}</span>
                        </a>
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                        <button className="text-gray-600 hover:text-gray-800">
                            <BiEditAlt size={30}/>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                            <RiDeleteBinLine size={30}/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default EventDetails;
