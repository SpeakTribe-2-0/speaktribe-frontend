import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";


const SideBar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className=' max-w-[300px] border-[#9d9d9d33] border-1 py-5 px-3
    max-mobile:hidden
    '>
      <div className=' text-[#333] flex flex-col gap-5 text-[13px]'>
        <div className='flex justify-start items-center gap-4 cursor-pointer'>
          <FaHome color='#009688'/>
          Home
        </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer'>
          <IoIosInformationCircle color='#009688'/>
          About
        </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer'>
          <TbLayoutDashboardFilled color='#009688'/>
          Dashboard
        </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer'>
          <IoPeople color='#009688'/>
          Account Settings
        </div>
        <div className=''>
          <div onClick={() => { setOpen(!open) }} className='flex justify-start items-center gap-4 cursor-pointer cursor-pointer'>
            <IoMdSettings color='#009688'/>
            Language Settings
            <FaChevronDown className=' ml-10' color='#009688'/>

          </div>
          {open && (
            <div className='mt-3 text-[16px] font-semibold flex flex-col gap-3'>
              <p className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Yoruba</p>
              <p className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Hausa</p>
              <p className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Igbo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar