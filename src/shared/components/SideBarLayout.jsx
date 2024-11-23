import React, { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { Outlet } from 'react-router-dom';
import UserProfile from './global/UserProfile';
import loadedImageUrl from "../../assets/user7.jpg";
import { BellIcon } from '@heroicons/react/24/solid';
import { getUser } from "../../auth/auth.js";
import fsts from "../../assets/fsts.png";
import axiosInstance from '../../auth/axios.js';
import { getImage } from '../../repositories/image.repository.js';
import { ToastContainer } from 'react-toastify';

function SideBarLayout() {
  const user = {
    firstName: 'Mohammed',
    lastName: 'ARAMALI'
  };
  const userId = getUser()?.id;
  const [userImage, setUserImage] = useState(null);
  const count = 3;

  useEffect(() => {
      axiosInstance.get(`/user/profile/${userId}`)
      .then((response) => {
        console.log("response data error" ,response.data);
        getImage(response.data.id).then((res) => {
          setUserImage(res);
        });
      }) 
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'image", error);
      });
  },[userId]);

  return (
    <div className="h-[98vh] w-full bg-gray-100">
      <ToastContainer />
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center">
            <img src={fsts} alt="logo" className="w-10 h-10" />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <BellIcon className="h-8 w-8 text-gray-600" />
              {count > 0 && (
                <span className="absolute top-0 right-0 text-xs text-white bg-[#E49F13] rounded-full px-1">
                  {count}
                </span>
              )}
            </div>

            <UserProfile
              user={{
                name: getUser()?.fullName ? getUser().fullName : "Unknown",
                email: user.sub,
                avatar: !!userImage ? userImage : loadedImageUrl,
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex pt-[3.75rem] h-full mt-1">
        <aside className="w-[21%] h-full bg-white shadow-md">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SideBarLayout;
