import {Typography} from "@material-tailwind/react";
import {AiOutlineClockCircle, AiOutlineInstagram} from "react-icons/ai";
import {BiArrowBack, BiEditAlt} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import logo from "../../assets/bac.jpeg";
import {useNavigate} from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

const event = {
    name: "Paris Through the Lens",
    description: "Join us for an extraordinary photography event where we explore the hidden gems and iconic sights of Paris. 'Paris Through the Lens' invites photographers of all skill levels to capture the city's beauty in a guided tour led by professional photographers. Enjoy hands-on workshops, meet fellow enthusiasts, and participate in a photo contest with exciting prizes for the best shots of the day!",
    date: "Saturday, 16th December 2024",
    time: "10:00 AM - 4:00 PM",
    place: "Montmartre, Paris, France",
    organiser: {
        name: "Marie Claire",
        image: logo
    },
    instagram: "https://www.instagram.com/club__impact_",
    image: "https://www.telecom-paris.fr/wp-content-EvDsK19/uploads/2020/10/semaine-integration-1200x800-1.jpg",
};

const EventDetails = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-white p-8 min-h-screen">
            <button onClick={() => navigate(-1)} className="flex items-center text-black text-xl mb-4 space-x-2">
                <BiArrowBack size={30}></BiArrowBack>
                <span>Back</span>
            </button>
            <div className="container mx-auto flex flex-col lg:flex-row items-start gap-10 w-full h-full">
                <div className="flex-shrink-0 w-full lg:w-1/3 h-1/3">
                    <img
                        src={event.image}
                        alt="Event"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="flex-grow w-full lg:w-1/2 space-y-3">
                    <div className="flex items-center space-x-1">
                        <img
                            src={event.organiser.image}
                            alt={event.organiser.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                        />
                        <div className="flex flex-col" onClick={()=> navigate("/club/1")}>
              <span className="text-lg font-bold text-gray-800 hover:underline cursor-pointer hover:text-blue-600">
                {event.organiser.name}
              </span>
                            <span className="text-xs font-bold text-gray-700">120 members</span>
                        </div>
                    </div>

                    <Typography variant="h1" color="blue-gray" className="text-4xl font-bold text-black">
                        {event.name}
                    </Typography>
                    <Typography variant="lead" className="text-gray-700 text-lg">
                        {event.description}
                    </Typography>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center space-x-3">
                            <AiOutlineClockCircle size={30} color={"4207F2"}/>
                            <span className="text-lg italic">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdLocationOn size={30} color={"4207F2"}></MdLocationOn>
                            <span className="text-lg italic">{event.place}</span>
                        </div>
                        <a className="flex items-center space-x-3" href={event.instagram} >
                            <AiOutlineInstagram size={30} color="F20707"/>
                            <span className="text-lg italic hover:text-blue-500">@{event.instagram.split('/')[event.instagram.split('/').length-1]}</span>
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 mt-4">
                        <button className="text-gray-600 hover:text-gray-800">
                            <BiEditAlt size={24}/>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                            <RiDeleteBinLine size={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default EventDetails;
