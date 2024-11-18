import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from the URL
import {
  FaEnvelope,
  FaIdCard,
  FaUserGraduate,
  FaUsers,
  FaCrown,
  FaInstagram,
  FaFacebook,
  FaWhatsapp
} from 'react-icons/fa';
import userImage from "../../../assets/user7.jpg";
import back from "../../../assets/back.jpg";
import axiosInstance from '../../../auth/axios';
import { getUser } from '../../../auth/auth';

const Profile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUserId = id || getUser().id; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/user/${getUserId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [getUserId]); 

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available</p>;

  const isStudent = user.cne !== undefined;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden mt-10 transform transition duration-500 hover:scale-105">
      <div
        className="relative h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${back})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-50"></div>
      </div>

      <div className="p-6 -mt-20 relative z-10 text-center">
        <div className="w-36 h-36 rounded-full bg-white overflow-hidden border-4 border-indigo-500 mx-auto shadow-lg transform transition duration-300 hover:scale-110">
          <img
            src={userImage}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            {user.firstName} {user.lastName}
          </h1>
          {user.email && (
            <p className="text-indigo-600 flex items-center justify-center mt-2 text-lg">
              <FaEnvelope className="mr-2" /> {user.email}
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {user.instagram && (
            <a
              href={user.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 text-2xl hover:text-pink-600"
            >
              <FaInstagram />
            </a>
          )}
          {user.facebook && (
            <a
              href={user.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-2xl hover:text-blue-700"
            >
              <FaFacebook />
            </a>
          )}
          {user.whatsapp && (
            <a
              href={user.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 text-2xl hover:text-green-600"
            >
              <FaWhatsapp />
            </a>
          )}
        </div>

        {/* <div className="border-t border-gray-300 pt-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center">
            <FaIdCard className="mr-2 text-indigo-500" /> Basic Information
          </h2>
          <div className="mt-2 text-gray-600 text-lg">
            {user.cin && <p><strong>CIN:</strong> {user.cin}</p>}
          </div>
        </div> */}

        {isStudent && (
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              <FaUserGraduate className="mr-2 text-indigo-500" /> Student Information
            </h2>
            <div className="mt-2 text-gray-600 text-lg">
              {user.cne && <p><strong>CNE:</strong> {user.cne}</p>}
              {user.filiere && <p><strong>Filière:</strong> {user.filiere}</p>}
            </div>
          </div>
        )}

        {user.memberClubs?.length > 0 && (
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              <FaUsers className="mr-2 text-indigo-500" /> Clubs
            </h2>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {user.memberClubs.map((club, index) => (
                <button
                  key={index}
                  className="bg-indigo-100 text-indigo-700 font-semibold py-1 px-4 rounded-full hover:bg-indigo-200 transition duration-300"
                >
                  {club}
                </button>
              ))}
            </div>
          </div>
        )}

        {user.adminClubs?.length > 0 && (
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              <FaCrown className="mr-2 text-indigo-500" /> Admin of Clubs
            </h2>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {user.adminClubs.map((club, index) => (
                <button
                  key={index}
                  className="bg-yellow-100 text-yellow-700 font-semibold py-1 px-4 rounded-full hover:bg-yellow-200 transition duration-300"
                >
                  {club}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
