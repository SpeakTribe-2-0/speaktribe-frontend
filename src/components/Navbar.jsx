import React, { useEffect, useState } from 'react'
import { IoPersonOutline } from "react-icons/io5";
import logo from '../assets/speakTribe-logo.png'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isOpen]);
  return (
    <div className=' flex justify-between items-center px-10 pb-6 pt-2 relative
    max-mobile:px-4 max-mobile:pt-4
    '>
      <div>
        <img src={logo} alt="" className='w-[80px] max-mobile:w-[50px]' />
      </div>
      <div className=' flex justify-center items-center gap-7 max-mobile:text-[13px] font-semibold'>
        <p>Home</p>
        <p>About</p>
      </div>
      <div className=' flex justify-center items-center gap-7 cursor-pointer'>
        <IoPersonOutline size={20} color='#009688' className='max-mobile:hidden' />
        <div className=' rounded-full w-[40px] h-[40px] bg-[#009688] max-mobile:hidden'></div>
        <IoPersonOutline
          onClick={() => setIsOpen(!isOpen)}
          size={20} color='#009688' className='hidden max-mobile:block ' />
      </div>
      {isOpen && (
        <div className=' absolute  inset-0 h-screen bg-white px-5 py-5 gap-10 flex flex-col'>
          <div className='flex items-center justify-between'>
            <img src={logo} alt="" className='w-[80px] max-mobile:w-[70px]' />
            <p onClick={() => setIsOpen(!isOpen)} className=' font-bold text-red-600 text-2xl cursor-pointer'>X</p>
          </div>
          <div className=' text-[#333] flex flex-col gap-5 text-[13px] '>
            <div className='flex justify-start items-center gap-4 cursor-pointer'>
              <FaHome color='#009688' />
              Home
            </div>
            <div className='flex justify-start items-center gap-4 cursor-pointer'>
              <IoIosInformationCircle color='#009688' />
              About
            </div>
            <div className='flex justify-start items-center gap-4 cursor-pointer'>
              <TbLayoutDashboardFilled color='#009688' />
              Dashboard
            </div>
            <div className='flex justify-start items-center gap-4 cursor-pointer'>
              <IoPeople color='#009688' />
              Account Settings
            </div>
            <div className=''>
              <div onClick={() => { setOpen(!open) }} className='flex justify-start items-center gap-4 cursor-pointer cursor-pointer'>
                <IoMdSettings color='#009688' />
                Language Settings
                <FaChevronDown className='' color='#009688' />

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
      )}
    </div>
  )
}

export default Navbar