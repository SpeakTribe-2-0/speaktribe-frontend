import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className=' max-w-[300px] border-[#9d9d9d33] border-1 py-5 px-3
    max-mobile:hidden
    '>
      <div className=' text-[#333] flex flex-col gap-5 text-[13px]'>
        <div  
        onClick={() => navigate('/home')}
        className='flex justify-start items-center gap-4 cursor-pointer'>
          <FaHome color='#009688'/>
          Home
        </div>
        <div  
        onClick={() => navigate('/about')}
        className='flex justify-start items-center gap-4 cursor-pointer'>
          <IoIosInformationCircle color='#009688'/>
          About
        </div>
        <div  
        onClick={() => navigate('/dashboard')}
        className='flex justify-start items-center gap-4 cursor-pointer'>
          <TbLayoutDashboardFilled color='#009688'/>
          Dashboard
        </div>
        <div  
        onClick={() => navigate('')}
        className='flex justify-start items-center gap-4 cursor-pointer'>
          <IoPeople color='#009688'/>
          Account Settings
        </div>
        <div className=''>
          <div onClick={() => { setOpen(!open) }} className='flex justify-start items-center gap-4 cursor-pointer'>
            <IoMdSettings color='#009688'/>
            Language Settings
            <FaChevronDown className=' ml-10' color='#009688'/>

          </div>
          {open && (
            <div className='mt-3 text-[16px] font-semibold flex flex-col gap-3'>
              <p  
              onClick={() => navigate('/yoruba-alphabet')}
              className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Yoruba</p>
              <p  
              onClick={() => navigate('/hausa-alphabet')}
              className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Hausa</p>
              <p  
              onClick={() => navigate('/igbo-alphabet')}
              className=' hover:bg-[#F5FAF5] w-full pl-8 transition-colors duration-500 cursor-pointer rounded ease-in-out '>Igbo</p>
            </div>
          )}
        </div>
        <div
        onClick={() => navigate('/login')}
        className='flex justify-start items-center gap-4 cursor-pointer'>
          <TbLogout2 color='red'/>
          Logout
        </div>
      </div>
    </div>
  )
}

export default SideBar