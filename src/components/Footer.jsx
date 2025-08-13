import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <div className=' text-white bg-[#009688] flex items-center justify-between px-24 h-14 mt-16'>
      <div className='flex items-center justify-between gap-10'>
        <p>Learn</p>
        <p>Company</p>
        <p>Support</p>
      </div>
      <div className='flex items-center justify-between gap-10'>
        <FaLinkedin />
        <AiFillInstagram />
        <BsTwitterX />
        <FaFacebook />
      </div>
    </div>
  )
}

export default Footer