import React from 'react'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'
import UserProfile from './global/UserProfile'
import loadedImageUrl from "../../assets/user7.jpg"
import { BellIcon } from '@heroicons/react/24/solid'

function SideBarLayout() {

    const user = {
        firstName: 'Mohammed',
        lastName: 'ARAMALI'
    }
    const count = 3;

  return (
        <div className={`flex h-[100vh] overflow-hidden gap-3 w-[100%] bg-white`}>
          <div className='mr-2 w-[21%] h-[100vh] overflow-hidden'>
              <Sidebar/>
          </div>
            <div className="flex-1 w-[78%] flex flex-col overflow-hidden">
                <header className="flex items-center justify-center bg-white shadow-md p-4">
                    {/* <button className="text-gray-600 focus:outline-none md:hidden" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button> */}


                    <div className=" w-full flex items-center justify-end space-x-4 gap-4 ">

                    <div className="relative">
                          <BellIcon className="h-9 w-9" />
                          {count > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1  text-xs font-bold leading-none text-red-100 bg-[#E49F13] rounded-full">
                              {count}
                            </span>
                          )}
                        </div>
                        <UserProfile user={{ name: user.firstName, email: user.lastName, avatar: loadedImageUrl }} />
                    </div>
                </header>
                <main className="scrollbar-thin scrollbar-thumb-primaryColor scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full p-6 bg-white overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
  )
}

export default SideBarLayout