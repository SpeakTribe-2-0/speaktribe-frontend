import React from 'react'
import { IoPersonOutline } from "react-icons/io5";
import logo from '../assets/speakTribe-logo.png'

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center px-10 pb-6 pt-2'>
      <div>
        <img src={logo} alt="" className='w-[80px]' />
      </div>
      <div className=' flex justify-center items-center gap-7'>
        <p>Home</p>
        <p>About</p>
      </div>
      <div className=' flex justify-center items-center gap-7 cursor-pointer'>
        <IoPersonOutline size={20} color='#009688'/>
        <div className=' rounded-full w-[40px] h-[40px] bg-[#009688]'></div>
      </div>
    </div>
  )
}

export default Navbar