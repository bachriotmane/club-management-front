import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaUserGraduate,
  FaUsers,
  FaCrown,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaCamera,
} from "react-icons/fa";
import userImage from "../../../assets/user7.jpg";
import back from "../../../assets/back.jpg";
import axiosInstance from "../../../auth/axios";
import { getUser } from "../../../auth/auth";
import { getImage } from "../../../repositories/image.repository";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUserId = id || getUser()?.id;
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/user/${getUserId}`);
        setUser(response.data);
        getImage(response.data?.imageProfile).then((res) => {
          setProfileImage(res);
        });

        getImage(response.data?.imageCover).then((res) => {
          setCoverImage(res);
        });
        console.log("user id ",getUserId);
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

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png","image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.info("Only JPG or PNG images are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.info("File size must not exceed 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append(type, file);

    try {
      setIsUploading(true);
      const endpoint = type === "profile" ? `/user/profile/${getUserId}` : `/user/cover/${getUserId}`;
      await axiosInstance.patch(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (type === "profile") {
        setProfileImage(URL.createObjectURL(file));
      } else {
        setCoverImage(URL.createObjectURL(file));
      }

      toast.success(`${type === "profile" ? "Profile" : "Cover"} image updated successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload the image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden mt-10 transform transition duration-500 hover:scale-105">
      <div className="relative h-56 bg-cover bg-center group" style={{ backgroundImage: `url(${coverImage || back})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-50"></div>
        {
          getUser()?.id === getUserId &&
        <div className="absolute top-4 right-4">
          <label className="cursor-pointer">
             <FaCamera className="text-white text-2xl opacity-75 hover:opacity-100 transition" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "cover")}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
  }
      </div>

      <div className="p-6 -mt-20 relative z-10 text-center">
        {/* Profile Image */}
        <div className="w-36 h-36 rounded-full bg-white overflow-hidden border-4 border-indigo-500 mx-auto shadow-lg relative group">
          <img src={profileImage || userImage} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
       {
          getUser()?.id === getUserId &&
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <label className="cursor-pointer">
              <FaCamera className="text-white text-3xl" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "profile")}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
     }
        </div>

        {/* User Info */}
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">{user.firstName} {user.lastName}</h1>
          {user.email && (
            <p className="text-indigo-600 flex items-center justify-center mt-2 text-lg">
              <FaEnvelope className="mr-2" /> {user.email}
            </p>
          )}
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-4">
          {user.instagram && <a href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-2xl hover:text-pink-600"><FaInstagram /></a>}
          {user.facebook && <a href={user.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-700"><FaFacebook /></a>}
          {user.whatsapp && <a href={user.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl hover:text-green-600"><FaWhatsapp /></a>}
        </div>

        {/* Additional Info */}
        {isStudent && (
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center">
              <FaUserGraduate className="mr-2 text-indigo-500" /> Student Info
            </h2>
            <div className="mt-2 text-gray-600 text-lg">
              {user.cne && <p><strong>CNE:</strong> {user.cne}</p>}
              {user.filiere && <p><strong>Field:</strong> {user.filiere}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
