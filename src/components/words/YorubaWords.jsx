import React from 'react'
import water from "../../assets/glass-of-water.png" 

const YorubaWords = () => {

  const words = [
    {word:'Omi', pronunciation: 'oh-mee', meaning: 'Water', image: null, eg: 'Mo fe omi.', english:'"I want water."' },
  ]
  return (
    <div>
      <div>
        <p>Yoruba Vocabulary</p>
      </div>
      <div className=' bg-amber-400 w-[330px] px-3 py-2'>
        <div className=' bg-gray-500'>
          <p className=' text-[#009688] font-semibold text-[18px]'>Omi</p>
          <p className=' text-[#7a7a7a] text-[13px] italic'>Oh-mee</p>
          <p className=' font-semibold'>Water</p>
        </div>
        <div className=' w-[70px] py-10'>
          <img src={water} alt="" />
        </div>
        <div>
          <p>Mo fe omi.</p>
          <p>"I want water."</p>
        </div>
      </div>
    </div>
  )
}

export default YorubaWords