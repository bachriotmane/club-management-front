import {Typography} from "@material-tailwind/react";
import {AiOutlineClockCircle} from "react-icons/ai";
import {BiArrowBack, BiEditAlt} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import logo from "../../assets/bac.jpeg";
import {useNavigate} from "react-router-dom";
import {MdPrivacyTip, MdPublic} from "react-icons/md";

const publication = {
    title: "Paris Through the Lens",
    description: "Join us for an extraordinary photography event where we explore the hidden gems and iconic sights of Paris. 'Paris Through the Lens' invites photographers of all skill levels to capture the city's beauty in a guided tour led by professional photographers. Enjoy hands-on workshops, meet fellow enthusiasts, and participate in a photo contest with exciting prizes for the best shots of the day!",
    date: "Saturday, 16th December 2024",
    organiser: {
        name: "Marie Claire",
        image: logo
    },
    isPublic: true,
    image: "https://vnmanpower.com/upload_images/images/2024/10/01/two-people-in-productive-business-meeting-addresses-agenda-items-and-to-do-list.jpg"
};

const PublicationDetails = () => {
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
                        src={publication.image}
                        alt="Event"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="flex-grow w-full lg:w-1/2 space-y-3">
                    <div className="flex items-center space-x-1">
                        <img
                            src={publication.organiser.image}
                            alt={publication.organiser.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                        />
                        <div className="flex flex-col" onClick={() => navigate("/club/1")}>
              <span className="text-lg font-bold text-gray-800 hover:underline cursor-pointer hover:text-blue-600">
                {publication.organiser.name}
              </span>
                            <span className="text-xs font-bold text-gray-700">120 members</span>
                        </div>
                    </div>

                    <Typography variant="h1" color="blue-gray" className="text-4xl font-bold text-black">
                        {publication.title}
                    </Typography>
                    <Typography variant="lead" className="text-gray-700 text-lg">
                        {publication.description}
                    </Typography>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center space-x-3">
                            <AiOutlineClockCircle size={34} color={"gray"}/>
                            <span className="text-lg italic">{publication.date}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            { publication.isPublic ? <MdPublic size={34} color={"gray"}></MdPublic> :<MdPrivacyTip size={34} color={"gray"}></MdPrivacyTip>}
                            {publication.isPublic ?
                                <span
                                    className="text-green-800 font-bold text-lg border-2 px-2 rounded-xl bg-green-100">public</span> :
                                <span
                                    className="text-red-800 font-bold text-lg border-2 px-2 rounded-xl bg-red-100">private</span>
                            }
                        </div>
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

export default PublicationDetails;
