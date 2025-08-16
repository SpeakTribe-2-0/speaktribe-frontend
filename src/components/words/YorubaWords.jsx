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
      <div className=' bg-amber-400'>
        <div className=' bg-gray-500'>
          <p>Omi</p>
          <p>Oh-mee</p>
          <p>Water</p>
        </div>
        <div className=' w-[70px]'>
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