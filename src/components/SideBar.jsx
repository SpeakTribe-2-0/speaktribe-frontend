import React from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className=' max-w-[300px] border-[#9d9d9d33] border-1 py-5 px-3'>
      <div className=' text-[#333] flex flex-col gap-5 text-[13px]'>
        <div className='flex justify-start items-center gap-4'>
          <FaHome />
          Home
        </div>
        <div className='flex justify-start items-center gap-4'>
          <IoIosInformationCircle />
          About
        </div>
        <div className='flex justify-start items-center gap-4'>
          <TbLayoutDashboardFilled />
          Dashboard
        </div>
        <div className='flex justify-start items-center gap-4'>
          <IoPeople />
          Account Settings
        </div>
        <div className='flex justify-start items-center gap-4'>
          <IoMdSettings />
          Language Settings
          <FaChevronDown className=' ml-10'/>
        </div>
      </div>
    </div>
  )
}

export default SideBar