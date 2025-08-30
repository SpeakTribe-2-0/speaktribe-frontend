import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className=' text-white bg-[#009688] flex items-center justify-between px-24 h-14 mt-16
    max-tablet:px-14
    max-mobile:px-5 max-mobile:mt-5
    '>
      <div className='flex items-center justify-between gap-10 max-mobile:gap-3 max-mobile:text-[13px]'>
        <p className=' cursor-pointer'>Learn</p>
        <p className=' cursor-pointer'>Company</p>
        <p onClick={() => navigate('/qrcode')} className=' cursor-pointer'>QrCode</p>
      </div>
      <div className='flex items-center justify-between gap-10 max-mobile:gap-3 cursor-pointer max-mobile:text-[13px]'>
        <FaLinkedin />
        <AiFillInstagram />
        <BsTwitterX />
        <FaFacebook />
      </div>
    </div>
  )
}

export default Footer