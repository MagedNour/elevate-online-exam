'use client'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { signOut } from "next-auth/react";
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';



const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});




export default function SideNavLayOut({ children }: { children: ReactNode }) {
  const [modalOpened, setModalOpened] = useState(false)
  const router = useRouter();

  function handleSignOut(){
    localStorage.removeItem("token")
    signOut();    
  }
  return (
    <div className={`grid grid-cols-12 min-h-screen bg-[#FBF9F9]`}>
      <div className={`sideNav hidden md:block md:col-span-2 ${poppins.className}`}>
        <div className="container ms-8 my-5">
          <Image priority width={151} height={29} src={"/Final Logo 1.png"} alt={"Logo"} />

          <button onClick={()=> router.push('/')} className="bg-primary text-white flex p-3 gap-8 items-center rounded-[10px] text-xl font-semibold my-10">
            <Image width={18} height={18} src={"/Vector (1).png"} alt={"Dashboard icon"} />
            Dashboard
          </button>

          <button className="text-[#696F79] flex p-3 gap-8 items-center rounded-[10px] text-xl font-semibold my-10">
            <Image width={18} height={18} src={"/ic_twotone-history.png"} alt={"History icon"} />
            Quiz History
          </button>

          <button onClick={() => setModalOpened(true)} className="text-[#696F79] flex p-3 gap-8 items-center rounded-[10px] text-xl font-semibold my-10">
            <Image width={18} height={18} src={"/Vector (2).png"} alt={"Logout icon"} />
            Log Out
          </button>
        </div>
      </div>
      <div className="home-Content col-span-12 md:col-span-10">
        {children}
      </div>

      {/* <!-- Log-Out Modal --> */}
      <div id="logOutModal" aria-hidden={!modalOpened}
        className={`${modalOpened ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button onClick={() => setModalOpened(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="logOutModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to Log Out?</p>
            <div className="flex justify-center items-center space-x-4">
              <button onClick={() => setModalOpened(false)} data-modal-toggle="logOutModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                No, cancel
              </button>
              <button onClick={() => handleSignOut()} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
